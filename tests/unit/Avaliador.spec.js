import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromisses from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    id: 1,
    produto: 'Video Game',
    descricao: 'Um video game bem bacana, com vários jogos exclusivos.',
    lanceInicial: 1000
  },
  {
    id: 2,
    produto: 'Notebook',
    descricao: 'Completinho, quase novo. A diversão é garantida!',
    lanceInicial: 500
  },
  {
    id: 3,
    produto: 'Livro da Casa do Código',
    descricao: 'Um livro super completo, sobre um assunto incrível.',
    lanceInicial: 500
  }
]

describe('Um avaliador se conecta com a API', () => {
  test('mostra todo os leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    await flushPromisses()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })

  test('Não há leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce([])
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    await flushPromisses()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})
