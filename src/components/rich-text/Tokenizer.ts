
import { Parser } from './Parser'

class Tokenizer {
  _state = 'TEXT'
  _buffer = ''
  _sectionStart = 0
  _index = 0

  _cbs: Parser

  constructor(cbs) {
    this._cbs = cbs;
  }

  TEXT = (c) => {
    var index = this._buffer.indexOf("<", this._index);
    if (index != -1) {
      this._index = index;
      this._cbs.ontext(this._getSection());
      this._state = "BeforeTag";
      this._sectionStart = this._index;
    } else this._index = this._buffer.length;
  }

  BeforeTag = (c) => {
    switch (c) {
      case "/":
        this._state = "BeforeCloseTag";
        break;
      case "!":
        this._state = "BeforeDeclaration";
        break;
      case "?":
        let index = this._buffer.indexOf(">", this._index);
        if (index != -1) {
          this._index = index;
          this._sectionStart = this._index + 1;
        } else this._sectionStart = this._index = this._buffer.length;
        this._state = "TEXT";
        break;
      case ">":
        this._state = "TEXT";
        break;
      case "<":
        this._cbs.ontext(this._getSection());
        this._sectionStart = this._index;
        break;
      default:
        if (/\s/.test(c)) this._state = "TEXT";
        else {
          this._state = "InTag";
          this._sectionStart = this._index;
        }
    }
  }

  InTag = (c) => {
    if (c === "/" || c === ">" || /\s/.test(c)) {
      this._cbs.onopentagname(this._getSection());
      this._state = "BeforeAttrsName";
      this._index--;
    }
  }

  BeforeAttrsName = (c) => {
    if (c === ">") {
      this._cbs.onopentagend();
      this._state = "TEXT";
      this._sectionStart = this._index + 1;
    } else if (c === "/") {
      this._state = "InSelfCloseTag";
    } else if (!(/\s/.test(c))) {
      this._state = "InAttrsName";
      this._sectionStart = this._index;
    }
  }

  InAttrsName = (c) => {
    if (c === "=" || c === "/" || c === ">" || /\s/.test(c)) {
      this._cbs._attribname = this._getSection().toLowerCase();
      this._sectionStart = -1;
      this._state = "AfterAttrsName";
      this._index--;
    }
  }

  AfterAttrsName = (c) => {
    if (c === "=") {
      this._state = "BeforeAttrsValue";
    } else if (c === "/" || c === ">") {
      this._cbs.onattribend();
      this._state = "BeforeAttrsName";
      this._index--;
    } else if (!(/\s/.test(c))) {
      this._cbs.onattribend();
      this._state = "InAttrsName";
      this._sectionStart = this._index;
    }
  }

  BeforeAttrsValue = (c) => {
    if (c === '"') {
      this._state = "InAttrsValueDQ";
      this._sectionStart = this._index + 1;
    } else if (c === "'") {
      this._state = "InAttrsValueSQ";
      this._sectionStart = this._index + 1;
    } else if (!(/\s/.test(c))) {
      this._state = "InAttrsValueNQ";
      this._sectionStart = this._index;
      this._index--;
    }
  }

  InAttrsValueDQ = (c) => {
    if (c === '"') {
      this._cbs._attribvalue += this._getSection();
      this._cbs.onattribend();
      this._state = "BeforeAttrsName";
    }
  }

  InAttrsValueSQ = (c) => {
    if (c === "'") {
      this._cbs._attribvalue += this._getSection();
      this._cbs.onattribend();
      this._state = "BeforeAttrsName";
    }
  }

  InAttrsValueNQ = (c) => {
    if (/\s/.test(c) || c === ">") {
      this._cbs._attribvalue += this._getSection();
      this._cbs.onattribend();
      this._state = "BeforeAttrsName";
      this._index--;
    }
  }

  BeforeCloseTag = (c) => {
    if (/\s/.test(c)){}
    else if (c === ">") {
      this._state = "TEXT";
    } else {
      this._state = "InCloseTag";
      this._sectionStart = this._index;
    }
  }

  InCloseTag = (c) => {
    if (c === ">" || /\s/.test(c)) {
      this._cbs.onclosetag(this._getSection());
      this._state = "AfterCloseTag";
      this._index--;
    }
  }

  InSelfCloseTag = (c) => {
    if (c === ">") {
      this._cbs.onopentagend();
      this._state = "TEXT";
      this._sectionStart = this._index + 1;
    } else if (!(/\s/.test(c))) {
      this._state = "BeforeAttrsName";
      this._index--;
    }
  }

  AfterCloseTag = (c) => {
    if (c === ">") {
      this._state = "TEXT";
      this._sectionStart = this._index + 1;
    }
  }

  BeforeDeclaration = (c) => {
    if (c == '-') this._state = "InComment";
    else if (c == '[') this._state = "BeforeCDATA1";
    else this._state = "InDeclaration";
  }

  InDeclaration = (c) => {
    var index = this._buffer.indexOf(">", this._index);
    if (index != -1) {
      this._index = index;
      this._sectionStart = index + 1;
    } else this._sectionStart = this._index = this._buffer.length;
    this._state = "TEXT";
  }

  InComment = (c) => {
    let key = (c == '-' ? '-->' : '>');
    let index = this._buffer.indexOf(key, this._index);
    if (index != -1) {
      this._index = index + key.length - 1;
      this._sectionStart = this._index + 1;
    } else this._sectionStart = this._index = this._buffer.length;
    this._state = "TEXT";
  }

  BeforeCDATA1 = (c) => {
    if (c == 'C') this._state = "BeforeCDATA2";
    else this._state = "InDeclaration";
  }

  BeforeCDATA2 = (c) => {
    if (c == 'D') this._state = "BeforeCDATA3";
    else this._state = "InDeclaration";
  }

  BeforeCDATA3 = (c) => {
    if (c == 'A') this._state = "BeforeCDATA4";
    else this._state = "InDeclaration";
  }

  BeforeCDATA4 = (c) => {
    if (c == 'T') this._state = "BeforeCDATA5";
    else this._state = "InDeclaration";
  }

  BeforeCDATA5 = (c) => {
    if (c == 'A') this._state = "InCDATA";
    else this._state = "InDeclaration";
  }

  InCDATA = (c) => {
    let key = (c == '[' ? ']]>' : '>');
    let index = this._buffer.indexOf(key, this._index);
    if (index != -1) {
      this._index = index + key.length - 1;
      this._sectionStart = this._index + 1;
    } else this._sectionStart = this._index = this._buffer.length;
    this._state = "TEXT";
  }

  parse = (chunk) => {
    this._buffer += chunk;
    for (; this._index < this._buffer.length; this._index++)
      this[this._state](this._buffer[this._index]);
    if (this._state === "TEXT" && this._sectionStart !== this._index)
      this._cbs.ontext(this._buffer.substr(this._sectionStart));
    this._cbs.onend();
  }

  _getSection = () => {
    return this._buffer.substring(this._sectionStart, this._index);
  }
}

export default Tokenizer