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
  /^(?:abbreviate|abline|abs|acf|acf2AR|acos|acosh|add\.name|add1\.default|add1\.glm|add1|addmargins|addNA|addTaskCallback|addNextMethod|addNextCallback|adist|adjustcolor|aggregate|agrep|agrepl|alarm|alist|all\.equal|all|allGenerics|approx|approxfun|apropos|aregexc|argsAnywhere|arrows|as\.data\.frame|as\.Date|as\.double|as\.factor|as\.name|as\.numeric|as\.ordered|as\.single|assocplot|attach|attr|attributes|ave|axis|barplot|body|box|boxplot|browser|call|classLabel|classMetaName|className|completeSubclasses|doPrimitiveMethod|emptyMethodsList|print\.AsIs|print\.by|print\.condition|print\.connection|print\.data\.frame|print\.Date|print\.default|print\.difftime|print\.Dlist|print\.DLLInfo|print\.DLLInfoList|print)\b/
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
