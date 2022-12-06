import Markdown from 'markdown-it'

export default defineNuxtPlugin(() => {
    const md = new Markdown
    return {
      provide: {
        parseMarkdown: (data: string) => {
          if(isUndefined(data)){
            return data
          }
          return md.render(data)
        }
      }
    }
  })