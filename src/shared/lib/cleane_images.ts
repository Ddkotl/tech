import { dataBase } from "./db_conect"

async function cleaneImages(){
    try {
       const news_count = await dataBase.news.count()
       const reviews_count = await dataBase.reviews.count()
       const spec_count = await dataBase.specification.count()
       console.log(news_count,reviews_count,spec_count)
        console.log("images cleaned")
    } catch (error) {
        console.error("images do not cleaned",error)
    }

}

cleaneImages()