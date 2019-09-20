const fs = require("fs")
const { pascalCase: PascalCase } = require("change-case")
const colors = require("colors")
const { questionUntil } = require("tang-base-node-utils")

const typeMap = {
  "outline": "outline",
  "fill": "fill",
  "twotone": "two-tone",
  "two-tone": "two-tone",
  "twoTone": "two-tone",
}

function isFile(p) {
  try {
    const stats = fs.statSync(p)
    return stats.isFile()
  } catch(err) {
    return false
  }
}

const defaultTypes = ["outline", "fill", "two-tone"]

module.exports = async function (source) {
  const data = JSON.parse(source)
  const result = []
  const wrongPaths = []

  Object.entries(data).forEach(([name, types]) => {
    if (types === false) {
      return
    }
    const isDefaultVal = (types === true) || (types.length === 0)
    if (isDefaultVal) {
      types = defaultTypes
    }
    types.forEach(type => {
      const realType = typeMap[type] // two-tone
      const typeName = PascalCase(realType).toLowerCase() // twotone
      const dirName = PascalCase(`${name}-${realType}`) // XxxTwoTone
      const dirPath = `@ant-design/icons/lib/${typeName}/${dirName}`

      if (isFile(`node_modules/${dirPath}.js`)) {
        result.push(`export { default as ${dirName} } from "${dirPath}"`)
      } else if(!isDefaultVal) {
        wrongPaths.push(`${name.red}  ${type.green}  node_modules/${dirPath}.js`)
      }
    })
  })

  if (wrongPaths.length > 0) {
    console.log(`----------------------------------
    the following paths are not exist, check your [ .antd-icons ] file:
${wrongPaths.join("\n")}
    --------------------------------------`)
    const input = await questionUntil("input [ y / Y ] to continue: ", n => ["y", "Y"].includes(n))
    console.log("to be continue...")
  }

  return result.join("\n")
}
