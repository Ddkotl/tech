import { DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { dataBase } from "./db_conect";
import { fileStorage } from "./file-storage";
import { privateConfig } from "./config/private";

async function cleaneImages() {
  try {
    const news = await dataBase.news.findMany({
      select: {
        id: true,
        images: true,
        previewImage: true,
      },
    });
  const reviews = await dataBase.reviews.findMany({
    select:{
      id:true,
      images:true,
      previewImage:true
    }
  })
  const phone_models = await dataBase.phoneModels.findMany({
    select:{
      id:true,
      main_image:true
    }
  })

  const specifikations = await dataBase.specification.findMany({
    select:{
      id:true,
      images:true
    }
  })
  const users = await dataBase.user.findMany({
    select:{
      id:true,
      image:true
    }
  })
    const all_news_images = [];
    const all_news_preview = [];
    const all_reviews_images=[]
    const all_reviews_preview=[]
    const all_model_images=[]
    const all_model_preview=[]
    const all_users_images=[]

    for (let i = 0; i < news.length; i++) {
      if (news[i].images.length >= 5) {
        await dataBase.news.update({
          where: { id: news[i].id },
          data: {
            images: news[i].images.slice(0, 4),
          },
        });
      }
      all_news_images.push(...news[i].images.slice(0, 4).map((e) => e.replace("/storage/images/", "")));
      all_news_preview.push(news[i].previewImage?.replace("/storage/images/", ""));
    }

    for(let i=0; i< reviews.length;i++){
      if(reviews[i].images.length>=5){
        await dataBase.reviews.update({
          where:{id:reviews[i].id},
          data:{
            images:reviews[i].images.slice(0,4)
          }
        })
      }
      all_reviews_images.push(...reviews[i].images.slice(0,4).map((e)=>e.replace("/storage/images/","")))
      all_reviews_preview.push(reviews[i].previewImage?.replace("/storage/images/",""))
    }

for(let i=0; i<specifikations.length;i++){
  if(specifikations[i].images.length>=5){
    await dataBase.specification.update({
      where:{id:specifikations[i].id},
      data:{
        images:specifikations[i].images.slice(0,4)
      }
    })
  }
  all_model_images.push(...specifikations[i].images.slice(0,4).map((e)=>e.replace("/storage/images/","")))
  all_model_preview.push(phone_models[i].main_image.replace("/storage/images/",""))
}

for(let i= 0; i< users.length;i++){
  all_users_images.push(users[i].image?.replace("/storage/images/",""))
}

    const get_command = new ListObjectsV2Command({
      Bucket: privateConfig.S3_IMAGES_BUCKET,
      MaxKeys: 10000000,
    });
    const s3_res = await fileStorage.s3Client.send(get_command);
    const s3_img_to_delete = [];
    if (s3_res.Contents) {
      for (let i = 0; i < s3_res.Contents?.length; i++) {
        const img_path = s3_res.Contents[i].Key;
        const img_path_start = img_path?.split("/")[0];
        if (img_path && img_path_start === "news" && !all_news_images.includes(img_path)) {
          s3_img_to_delete.push(img_path);
        } else if (img_path && img_path_start === "news_preview" && !all_news_preview.includes(img_path)) {
          s3_img_to_delete.push(img_path);
        }else if(img_path && img_path_start === "reviews_preview" && !all_reviews_preview.includes(img_path)){
          s3_img_to_delete.push(img_path)
        }else if(img_path && img_path_start === "reviews" && !all_reviews_images.includes(img_path)){
          s3_img_to_delete.push(img_path)
        }else if(img_path && img_path_start === "avatar" && !all_users_images.includes(img_path)){
          s3_img_to_delete.push(img_path)
        }
      }
    }
    if (s3_img_to_delete.length > 0) {
      const delete_command = new DeleteObjectsCommand({
        Bucket: privateConfig.S3_IMAGES_BUCKET,
        Delete: {
          Objects: s3_img_to_delete.map((key) => ({ Key: key })),
          Quiet: false,
        },
      });
      const s3_del_res = await fileStorage.s3Client.send(delete_command);
      console.log(s3_del_res.Deleted);
    }
    console.log("images cleaned");
  } catch (error) {
    console.error("images do not cleaned", error);
  }
}

cleaneImages();
