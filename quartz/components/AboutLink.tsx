import { resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const AboutLink: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const href = resolveRelative(fileData.slug!, "about")
  return (
    <a href={href} class={classNames(displayClass, "about-link")}>
      About
    </a>
  )
}

export default (() => AboutLink) satisfies QuartzComponentConstructor
