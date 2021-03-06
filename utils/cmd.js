const cmdtree = {}

const cmd = (...args) => {
    const callback = args.pop()
    let cursor = cmdtree

    args.map(arg => {
        if (!cursor.hasOwnProperty(arg)) {
            cursor[arg] = {}
        }

        cursor = cursor[arg]
    })

    cursor._callback = callback
}

const trigger = async (args, ctx, user) => {
    let cursor = cmdtree

    while (cursor.hasOwnProperty(args[0])) {
        cursor = cursor[args[0]]
        args.shift()
    }

    if (!cursor.hasOwnProperty('_callback')) {
        throw new Error('Unknown command name, please try again, or use /help')
    }

    const newArgs = [ctx, user].concat(args)

    try {
        return await cursor._callback.apply({}, newArgs)
    } catch (err) {
        console.error(err) /* log actual error to the console */
        throw new Error('There was an internal error, please notify the developer')
    }
}

module.exports = {
    cmd,
    trigger,
}

/* testing */

// cmd('help', async (...args) => {
//     console.log('help', args)
// })

// cmd('help', 'tomato', async (...args) => {
//     console.log('help', 'tomato', args)
// })

// trigger(['help', 1, 2, 3])
// trigger(['help', 'francesca', 2, 3])
// trigger(['help', 'tomato', 1, 2, 3])

