// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/shared/components";
// import { dataBase } from "@/shared/lib/db_conect";
// import { Prisma } from "@prisma/client";

// const getPhoneModelDescriptionById = async (
//   id: string,
// ): Promise<
//   | Prisma.PhoneModelsGetPayload<{
//       include: {
//         Reviews: {
//           select: {
//             id: true;
//             previewImage: true;
//             title: true;
//             views: true;
//           };
//         };
//         specifications: true;
//       };
//     }>
//   | undefined
//   | null
// > => {
//   try {
//     const model = await dataBase.phoneModels.findUnique({
//       where: {
//         id: id,
//       },
//       include: {
//         Reviews: {
//           select: {
//             id: true,
//             previewImage: true,
//             title: true,
//             views: true,
//           },
//         },
//         specifications: true,
//       },
//     });
//     return model;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default async function PhoneMobylePage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   return (
//     <div>
//       <h1>PhoneMobylePage</h1>
//     </div>
//   );
// }
