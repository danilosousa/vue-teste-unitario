import novoLeilao from '@/views/novoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'
jest.mock('@/http')

const $router = {
  push: jest.fn()
}

describe('Um novo leilão deve ser criado', () => {
  test('dado um formulario preenchido um leilao deve ser criado', () => {
    createLeilao.mockResolvedValueOnce()
    const wrapper = mount(novoLeilao, {
      mocks: {
        $router
      }
    })

    wrapper.find('.produto').setValue('Um novo item')
    wrapper.find('.descricao').setValue('Content item ')
    wrapper.find('form').trigger('submit')

    expect(createLeilao).toHaveBeenCalled()
  })
})
