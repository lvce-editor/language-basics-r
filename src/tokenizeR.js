/**
 * @enum number
 */
export const State = {
  TopLevelContent: 1,
  InsideString: 2,
  InsideLineComment: 3,
}

/**
 * @enum number
 */
export const TokenType = {
  None: 0,
  Text: 1,
  Function: 2,
}

export const TokenMap = {
  [TokenType.Text]: 'Text',
  [TokenType.Function]: 'Function',
}

export const initialLineState = {
  state: State.TopLevelContent,
  tokens: [],
}

export const hasArrayReturn = true

const RE_BUILTIN_FUNCTION =
  /^(?:abbreviate|abs|acos|acosh|addNA|addTaskCallback|agrep|agrepl|alist|all|all\.equal)\b/
const RE_ANYTHING = /^.+/s

/**
 * @param {string} line
 * @param {any} lineState
 */
export const tokenizeLine = (line, lineState) => {
  let next = null
  let index = 0
  let tokens = []
  let token = TokenType.None
  let state = lineState.state
  while (index < line.length) {
    const part = line.slice(index)
    switch (state) {
      case State.TopLevelContent:
        if ((next = part.match(RE_BUILTIN_FUNCTION))) {
          token = TokenType.Function
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ANYTHING))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          part //?
          throw new Error('no')
        }
        break
      default:
        throw new Error('no')
    }
    const tokenLength = next[0].length
    index += tokenLength
    tokens.push(token, tokenLength)
  }
  return {
    state,
    tokens,
  }
}
