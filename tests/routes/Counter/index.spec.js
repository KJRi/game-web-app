import CounterRoute from 'routes/Counter'

describe('(Route) Counter', () => {
  let _route

  beforeEach(() => {
    _route = CounterRoute({})
  })

  it('Should return an async route function', () => {
    expect(typeof _route).to.equal('function')
  })
})
