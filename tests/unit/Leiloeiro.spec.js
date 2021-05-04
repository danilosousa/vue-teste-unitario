import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromisses from 'flush-promises'

jest.mock('@/http')
const leilao = {
  produto: 'Livro',
  lanceInicial: 50,
  descricao: 'Um ótimo Livro'
}
const lances = [
  {
    id: 1,
    valor: 1001,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    valor: 1005,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1,
    id: 2
  },
  {
    valor: 1099,
    data: '2020-06-13T18:19:44.871Z',
    leilao_id: 1,
    id: 3
  },
  {
    valor: 500,
    data: '2020-07-24T14:40:33.951Z',
    leilao_id: 4,
    id: 4
  }
]

describe('Leiloeiro inicia um leilão e não possui lances', () => {
  test('Avisa quando não existem lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromisses()

    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(true)
  })
})

describe('Um leiloeiro exibe os lances existentes', () => {
  test('Não mostra o aviso de "sem lances"', async () => {
    const leilao = {
      produto: 'Livro',
      lanceInicial: 50,
      descricao: 'Um ótimo Livro'
    }

    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromisses()
    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(false)
  })
  test('Possui uma lista de lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromisses()
    const alerta = wrapper.find('.list-inline')
    expect(alerta.exists()).toBe(true)
  })
})

describe('Um leiloeiro comunica os valores de menores e maiores lances', () => {
  test('Mostra o maior lance daquele leilão', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromisses()
    const maiorLance = wrapper.find('.maior-lance')
    expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1099')
  })
  test('Mostra o menor lance daquele leilão', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromisses()
    const menorLance = wrapper.find('.menor-lance')
    expect(menorLance.element.textContent).toContain('Menor lance: R$ 500')
  })
})
