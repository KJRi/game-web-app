import HomeRoute from 'routes/Home'

describe('(Route) Home', () => {
  beforeEach(() => {
  })

  it('Should return a route configuration object', () => {
    expect(typeof HomeRoute).to.equal('function')
  })
})
