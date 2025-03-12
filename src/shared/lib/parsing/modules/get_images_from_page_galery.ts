import {Page} from "@playwright/test"
export const getImagesFromPageGalery = async (page:Page):Promise<string[] ||[]>=>{
const imgUrlList:string[] || [] =[]
const imgGaleryFirstLinkLocator:string = "div[class=''] > a"
try{
  let marker:string = ""
  const imgGaleryLink = await page.locator(imgGaleryFirstLinkLocator).nth(0)
  await imgGaleryLink.click()
  const imgLocator = "img[class='']"
  await page.locator(imgLokator).
  
}catch(e){
console.log("Не удалось получить картинки из галереи",e)
return []
}
}
