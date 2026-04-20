import { rest } from 'msw'

export const handlers = [
    rest.get('./events', (req, res, ctx) => {
        const data = { message: 'Hello World' }
        return res(ctx.status(200), ctx.json(data))
    })
]