export type CSSProperties = Record<string, string | number>

type ComponentAttribute = CommonAttribute

function isNil(value: string | number | null | undefined | ResourceColor | BorderRadiuses | Length | LocalizedBorderRadiuses): boolean {
  return value === null || value === undefined;
}

export class ApplyRootStyleModifier implements AttributeModifier<ComponentAttribute> {
  private css: CSSProperties

  constructor(configCss: CSSProperties) {
    this.css = configCss
  }

  applyNormalAttribute(instance: ComponentAttribute): void {
    if (!isNil(this.css?.width)) {
      instance.width(this.css?.width)
    }
    if (!isNil(this.css?.height)) {
      instance.height(this.css?.height)
    }
  }
}

export class ApplyStyleModifier implements AttributeModifier<ComponentAttribute> {
  private css: CSSProperties

  private initBackgroundColor?: ResourceColor
  backgroundColor(color: ResourceColor) {
    this.initBackgroundColor = color
    return this
  }

  private initBorderRadius?: Length | BorderRadiuses | LocalizedBorderRadiuses
  borderRadius(radius: Length | BorderRadiuses | LocalizedBorderRadiuses) {
    this.initBorderRadius = radius
    return this
  }

  private initWidth?: Length
  width(width: Length) {
    this.initWidth = width
    return this
  }

  private initHeight?: Length
  height(height: Length) {
    this.initHeight = height
    return this
  }

  constructor(configCss: CSSProperties) {
    this.css = configCss ?? {}
  }

  applyNormalAttribute(instance: ComponentAttribute): void {
    const width = !isNil(this.css?.width) ? this.css?.width : this.initWidth;
    if (!isNil(width)) {
      instance.width(width)
    }
    const height = !isNil(this.css?.height) ? this.css?.height : this.initHeight;
    if (!isNil(height)) {
      instance.width(height)
    }

    const backgroundColor = this.css?.backgroundColor ?? this.initBackgroundColor;
    if (!isNil(backgroundColor)) {
      instance.backgroundColor(backgroundColor)
    }

    if (!isNil(this.css?.borderRadius)) {
      instance.borderRadius(this.css.borderRadius)
    } else if (!isNil(this.initBorderRadius)) {
      instance.borderRadius(this.initBorderRadius)
    }

    if (!isNil(this.css.border) && typeof this.css.border === 'string') {
      const settingBorder = parseBorder(this.css.border)
      instance.borderWidth(settingBorder.width)
      instance.borderStyle(settingBorder.style)
      instance.borderColor(settingBorder.color)
    }
    if ([this.css.borderTop, this.css.borderBottom, this.css.borderLeft, this.css.borderRight].every(item => !isNil(item) && typeof item === 'string')) {

    }
  }
}

export class ApplyFontStyleModifier implements AttributeModifier<TextAttribute> {
  private css: CSSProperties

  private initFontColor?: ResourceColor
  fontColor(color: ResourceColor) {
    this.initFontColor = color
    return this
  }

  private initFontSize?: number | string | Resource
  fontSize(size: number | string | Resource) {
    this.initFontSize = size
    return this
  }

  private initFontWeight?: number | FontWeight | string
  fontWeight(size: number | FontWeight | string) {
    this.initFontWeight = size
    return this
  }

  constructor(configCss: CSSProperties) {
    this.css = configCss ?? {}
  }

  applyNormalAttribute(instance: TextAttribute): void {
    const color = this.css?.color ?? this.initFontColor
    if (color) {
      instance.fontColor(color)
    }
    const fontSize = this.css?.fontSize ?? this.initFontSize
    if (fontSize) {
      instance.fontSize(fontSize + 'vp')
    }

    const fontWeight = this.css?.fontWeight ?? this.initFontWeight
    if (fontWeight) {
      instance.fontWeight(fontWeight)
    }
  }
}


interface BorderRsult {
  width: number
  style: BorderStyle
  color: string
}
function parseBorder(borderStr: string): BorderRsult {
  const match = borderStr.match(/^(\d+\w+)\s+(solid|dashed|dotted)\s+(.+)$/);

  if (!match) {
    throw new Error('Invalid border string');
  }

  let style: BorderStyle = BorderStyle.Solid
  switch (match[2]) {
    case 'solid': {
      style = BorderStyle.Solid
      break
    }
    case 'dashed': {
      style = BorderStyle.Dashed
      break
    }
    case 'dotted': {
      style = BorderStyle.Dotted
      break
    }
    default: {
      style = BorderStyle.Solid
      break
    }
  }

  return {
    width: parseFloat(match[1]),
    style,
    color: match[3]
  };
}