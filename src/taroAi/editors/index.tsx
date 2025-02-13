import {loadBabel, loadLess, transformLess} from '../transform';
import aiEditors from "./editor-ai";

// TODO: 后面去掉
loadLess()
loadBabel()

export default {
  '@init': (params) => {
    const { style, data, id, input, output } = params
    style.width = '100%'
    style.height = 'fit-content'
  },
  '@resize': {
    options: ['width', 'height']
  },
  '@ai': aiEditors,
  ':slot': {},


}
