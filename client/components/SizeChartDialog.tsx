// // import { Button } from "@/components/ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import type { Product } from "@/data/products";
// // import { Ruler } from "lucide-react";

// // type CollectionName = Product["collection"];

// // type SizeTable = {
// //   title: string;
// //   note?: string;
// //   columns: [string, ...string[]];
// //   rows: Array<{ label: string; values: string[] }>;
// // };

// // type CollectionChart = {
// //   heading: string;
// //   description: string;
// //   tables: SizeTable[];
// // };

// // const SIZE_CHARTS: Record<CollectionName, CollectionChart> = {
// //   "Eid Collection": {
// //     heading: "Eid Collection size guide",
// //     description:
// //       "Festive women's kurtas and coordinated bottoms. Measurements are garment dimensions in inches; allow 1-2 inches ease for comfort.",
// //     tables: [
// //       {
// //         title: "Women's Kurtas",
// //         note: "Measured flat across the bust, waist and hip.",
// //         columns: ["Size", "Bust", "Waist", "Hip", "Length"],
// //         rows: [
// //           { label: "XS", values: ["32", "25", "35", "36"] },
// //           { label: "S", values: ["34", "27", "37", "37"] },
// //           { label: "M", values: ["36", "29", "39", "38"] },
// //           { label: "L", values: ["39", "32", "42", "39"] },
// //           { label: "XL", values: ["42", "35", "45", "40"] },
// //         ],
// //       },
// //       {
// //         title: "Women's Bottoms",
// //         note: "Elastic waist can be tightened; hip is full circumference.",
// //         columns: ["Size", "Waist", "Hip", "Outseam"],
// //         rows: [
// //           { label: "XS", values: ["24", "34", "37"] },
// //           { label: "S", values: ["26", "36", "38"] },
// //           { label: "M", values: ["28", "38", "39"] },
// //           { label: "L", values: ["31", "41", "40"] },
// //           { label: "XL", values: ["34", "44", "41"] },
// //         ],
// //       },
// //     ],
// //   },
// //   "Bakra Eid Specials": {
// //     heading: "Bakra Eid Specials size guide",
// //     description:
// //       "Coordinated family sets for the occasion. Measurements are garment dimensions in inches.",
// //     tables: [
// //       {
// //         title: "Men's Kurtas",
// //         columns: ["Size", "Chest", "Shoulder", "Sleeve", "Length"],
// //         rows: [
// //           { label: "S", values: ["38", "16.5", "24", "40"] },
// //           { label: "M", values: ["40", "17", "24.5", "41"] },
// //           { label: "L", values: ["42", "17.5", "25", "42"] },
// //           { label: "XL", values: ["44", "18", "25.5", "43"] },
// //         ],
// //       },
// //       {
// //         title: "Women's Kurtas",
// //         note: "Garment laid flat; hip measured 8 inches below natural waist.",
// //         columns: ["Size", "Bust", "Waist", "Hip", "Length"],
// //         rows: [
// //           { label: "XS", values: ["32", "25", "36", "37"] },
// //           { label: "S", values: ["34", "27", "38", "38"] },
// //           { label: "M", values: ["36", "29", "40", "39"] },
// //           { label: "L", values: ["39", "32", "43", "40"] },
// //         ],
// //       },
// //       {
// //         title: "Kids (3-10 yrs)",
// //         note: "Body measurements. Select the size nearest to chest.",
// //         columns: ["Age", "Chest", "Waist", "Length"],
// //         rows: [
// //           { label: "3-4", values: ["23", "21", "22"] },
// //           { label: "5-6", values: ["25", "22", "26"] },
// //           { label: "7-8", values: ["27", "24", "30"] },
// //           { label: "9-10", values: ["29", "25", "34"] },
// //         ],
// //       },
// //     ],
// //   },
// //   "14 August Independence Collection": {
// //     heading: "14 August Independence Collection size guide",
// //     description:
// //       "Signature green-and-white outfits sized for a relaxed, breezy fit. Measurements below are garment dimensions in inches.",
// //     tables: [
// //       {
// //         title: "Unisex Shirts",
// //         columns: ["Size", "Chest", "Shoulder", "Sleeve", "Length"],
// //         rows: [
// //           { label: "XS", values: ["36", "16", "22.5", "26"] },
// //           { label: "S", values: ["38", "16.5", "23", "27"] },
// //           { label: "M", values: ["40", "17", "23.5", "28"] },
// //           { label: "L", values: ["42", "17.5", "24", "29"] },
// //           { label: "XL", values: ["44", "18", "24.5", "30"] },
// //         ],
// //       },
// //       {
// //         title: "Unisex Trousers",
// //         note: "Waist measurements refer to elastic waistbands at rest.",
// //         columns: ["Size", "Waist", "Hip", "Inseam"],
// //         rows: [
// //           { label: "XS", values: ["26", "36", "27"] },
// //           { label: "S", values: ["28", "38", "28"] },
// //           { label: "M", values: ["30", "40", "29"] },
// //           { label: "L", values: ["33", "43", "30"] },
// //           { label: "XL", values: ["36", "46", "31"] },
// //         ],
// //       },
// //     ],
// //   },
// //   "Birthday Specials": {
// //     heading: "Birthday Specials size guide",
// //     description:
// //       "Play-friendly dresses sized by age group. Measurements are body measurements in inches; pick the size closest to the chest.",
// //     tables: [
// //       {
// //         title: "Girls' Frocks",
// //         columns: ["Age", "Chest", "Waist", "Length"],
// //         rows: [
// //           { label: "1-2", values: ["20", "19", "18"] },
// //           { label: "3-4", values: ["22", "20", "22"] },
// //           { label: "5-6", values: ["24", "21", "25"] },
// //           { label: "7-8", values: ["26", "23", "29"] },
// //           { label: "9-10", values: ["28", "24", "33"] },
// //         ],
// //       },
// //       {
// //         title: "Boys' Sets",
// //         note: "Length refers to top; trouser length given separately.",
// //         columns: ["Age", "Chest", "Waist", "Top Length", "Trouser Length"],
// //         rows: [
// //           { label: "1-2", values: ["21", "19", "16", "18"] },
// //           { label: "3-4", values: ["23", "20", "18", "22"] },
// //           { label: "5-6", values: ["25", "21", "20", "26"] },
// //           { label: "7-8", values: ["27", "23", "22", "30"] },
// //           { label: "9-10", values: ["29", "24", "24", "34"] },
// //         ],
// //       },
// //     ],
// //   },
// // };

// // type SizeChartDialogProps = {
// //   collection: CollectionName;
// // };

// // export default function SizeChartDialog({ collection }: SizeChartDialogProps) {
// //   const chart = SIZE_CHARTS[collection];

// //   return (
// //     <Dialog>
// //       <DialogTrigger asChild>
// //         <Button variant="outline" size="sm" className="gap-1 text-xs">
// //           <Ruler className="h-4 w-4" aria-hidden="true" />
// //           <span>Size guide</span>
// //         </Button>
// //       </DialogTrigger>
// //       <DialogContent className="max-h-[80vh] w-[min(90vw,640px)] overflow-y-auto">
// //         <DialogHeader>
// //           <DialogTitle>{chart?.heading ?? `Size guide`}</DialogTitle>
// //           <DialogDescription>
// //             {chart?.description ?? `We are preparing the size guide for ${collection}. Please check back soon.`}
// //           </DialogDescription>
// //         </DialogHeader>
// //         {chart ? (
// //           <div className="space-y-6">
// //             {chart.tables.map((table) => (
// //               <section key={table.title} className="space-y-3">
// //                 <div>
// //                   <h3 className="text-sm font-semibold">{table.title}</h3>
// //                   {table.note ? (
// //                     <p className="text-xs text-muted-foreground">{table.note}</p>
// //                   ) : null}
// //                 </div>
// //                 <div className="overflow-x-auto rounded-md border">
// //                   <table className="w-full min-w-[28rem] border-collapse text-sm">
// //                     <thead className="bg-muted/60">
// //                       <tr>
// //                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">
// //                           {table.columns[0]}
// //                         </th>
// //                         {table.columns.slice(1).map((column) => (
// //                           <th
// //                             key={column}
// //                             className="px-3 py-2 text-left font-medium text-muted-foreground"
// //                           >
// //                             {column}
// //                           </th>
// //                         ))}
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {table.rows.map((row) => (
// //                         <tr key={row.label} className="even:bg-muted/40">
// //                           <th scope="row" className="px-3 py-2 text-left font-medium">
// //                             {row.label}
// //                           </th>
// //                           {row.values.map((value, index) => (
// //                             <td key={index} className="px-3 py-2 text-left">
// //                               {value}
// //                             </td>
// //                           ))}
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </section>
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-sm text-muted-foreground">
// //             Our size guide for this collection will be uploaded shortly.
// //           </p>
// //         )}
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }



















// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import type { Product } from "@/data/products";
// import { Ruler } from "lucide-react";

// type CollectionName = Product["collection"];

// type SizeTable = {
//   title: string;
//   note?: string;
//   columns: [string, ...string[]];
//   rows: Array<{ label: string; values: string[] }>;
// };

// type CollectionChart = {
//   heading: string;
//   description: string;
//   tables: SizeTable[];
// };

// const SIZE_CHARTS: Record<CollectionName, CollectionChart> = {
//   "✨ Bestsellers Edit": {
//     heading: "Bestsellers Edit size guide",
//     description:
//       "Our most-loved pieces, adored by everyone. Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Women's Kurtas",
//         columns: ["Size", "Bust", "Waist", "Hip", "Length"],
//         rows: [
//           { label: "XS", values: ["32", "25", "35", "36"] },
//           { label: "S", values: ["34", "27", "37", "37"] },
//           { label: "M", values: ["36", "29", "39", "38"] },
//           { label: "L", values: ["39", "32", "42", "39"] },
//           { label: "XL", values: ["42", "35", "45", "40"] },
//         ],
//       },
//     ],
//   },
//   "🌸 New Arrivals": {
//     heading: "New Arrivals size guide",
//     description:
//       "Fresh styles just landed! Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Women's Tops",
//         columns: ["Size", "Bust", "Waist", "Length"],
//         rows: [
//           { label: "XS", values: ["32", "25", "24"] },
//           { label: "S", values: ["34", "27", "25"] },
//           { label: "M", values: ["36", "29", "26"] },
//           { label: "L", values: ["39", "32", "27"] },
//           { label: "XL", values: ["42", "35", "28"] },
//         ],
//       },
//     ],
//   },
//   "❄ Winter Wonders": {
//     heading: "Winter Wonders size guide",
//     description:
//       "Cozy, classy & winter-perfect outfits. Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Sweaters & Coats",
//         columns: ["Size", "Chest", "Shoulder", "Sleeve", "Length"],
//         rows: [
//           { label: "S", values: ["38", "16.5", "23", "26"] },
//           { label: "M", values: ["40", "17", "23.5", "27"] },
//           { label: "L", values: ["42", "17.5", "24", "28"] },
//           { label: "XL", values: ["44", "18", "24.5", "29"] },
//         ],
//       },
//     ],
//   },
//   "☀ Summer Bloom": {
//     heading: "Summer Bloom size guide",
//     description:
//       "Light, breezy & full of color. Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Casual Dresses",
//         columns: ["Size", "Bust", "Waist", "Length"],
//         rows: [
//           { label: "XS", values: ["32", "25", "36"] },
//           { label: "S", values: ["34", "27", "37"] },
//           { label: "M", values: ["36", "29", "38"] },
//           { label: "L", values: ["39", "32", "39"] },
//           { label: "XL", values: ["42", "35", "40"] },
//         ],
//       },
//     ],
//   },
//   "💍 The Wedding Season": {
//     heading: "The Wedding Season size guide",
//     description:
//       "Festive looks for the little stars of every shaadi. Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Kids' Sherwanis & Dresses",
//         columns: ["Age", "Chest", "Waist", "Length"],
//         rows: [
//           { label: "1-2", values: ["21", "19", "18"] },
//           { label: "3-4", values: ["23", "20", "22"] },
//           { label: "5-6", values: ["25", "21", "25"] },
//           { label: "7-8", values: ["27", "23", "29"] },
//           { label: "9-10", values: ["29", "24", "33"] },
//         ],
//       },
//     ],
//   },
//   "🌙 Eid Collection": {
//     heading: "Eid Collection size guide",
//     description:
//       "Celebrate joy in Rangista style! Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Women's Kurtas",
//         columns: ["Size", "Bust", "Waist", "Hip", "Length"],
//         rows: [
//           { label: "XS", values: ["32", "25", "35", "36"] },
//           { label: "S", values: ["34", "27", "37", "37"] },
//           { label: "M", values: ["36", "29", "39", "38"] },
//           { label: "L", values: ["39", "32", "42", "39"] },
//           { label: "XL", values: ["42", "35", "45", "40"] },
//         ],
//       },
//     ],
//   },
//   "🐐 Bakra Eid Edit": {
//     heading: "Bakra Eid Edit size guide",
//     description:
//       "Celebrate love, sacrifice & style — the Rangista way. Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Family Sets",
//         columns: ["Size", "Chest", "Waist", "Length"],
//         rows: [
//           { label: "S", values: ["38", "28", "40"] },
//           { label: "M", values: ["40", "30", "41"] },
//           { label: "L", values: ["42", "33", "42"] },
//           { label: "XL", values: ["44", "36", "43"] },
//         ],
//       },
//     ],
//   },
//   "Azadi Collection": {
//     heading: "Azadi Collection size guide",
//     description:
//       "Celebrate Pakistan’s spirit in true Rangista style! Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Unisex Shirts",
//         columns: ["Size", "Chest", "Shoulder", "Sleeve", "Length"],
//         rows: [
//           { label: "XS", values: ["36", "16", "22.5", "26"] },
//           { label: "S", values: ["38", "16.5", "23", "27"] },
//           { label: "M", values: ["40", "17", "23.5", "28"] },
//           { label: "L", values: ["42", "17.5", "24", "29"] },
//           { label: "XL", values: ["44", "18", "24.5", "30"] },
//         ],
//       },
//     ],
//   },
//   "👩‍🍼 Mommy & Me": {
//     heading: "Mommy & Me size guide",
//     description:
//       "Matching outfits for moms and their little ones. Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Women's Tops",
//         columns: ["Size", "Bust", "Waist", "Length"],
//         rows: [
//           { label: "S", values: ["34", "27", "25"] },
//           { label: "M", values: ["36", "29", "26"] },
//           { label: "L", values: ["39", "32", "27"] },
//         ],
//       },
//       {
//         title: "Kids' Tops",
//         columns: ["Age", "Chest", "Waist", "Length"],
//         rows: [
//           { label: "3-4", values: ["22", "21", "18"] },
//           { label: "5-6", values: ["24", "22", "21"] },
//           { label: "7-8", values: ["26", "23", "24"] },
//         ],
//       },
//     ],
//   },
//   "👗 Adults Collection": {
//     heading: "Adults Collection size guide",
//     description:
//       "Elegant & classy styles for all occasions. Measurements are garment dimensions in inches.",
//     tables: [
//       {
//         title: "Women's Dresses",
//         columns: ["Size", "Bust", "Waist", "Hip", "Length"],
//         rows: [
//           { label: "S", values: ["34", "27", "37", "38"] },
//           { label: "M", values: ["36", "29", "39", "39"] },
//           { label: "L", values: ["39", "32", "42", "40"] },
//           { label: "XL", values: ["42", "35", "45", "41"] },
//         ],
//       },
//     ],
//   },
//   "🎨 Handpainted Dupattas Collection": {
//     heading: "Handpainted Dupattas Collection size guide",
//     description:
//       "Artistic dupattas, each piece handpainted with care. Sizes are approximate fabric measurements in inches.",
//     tables: [
//       {
//         title: "Dupatta Dimensions",
//         columns: ["Type", "Length", "Width"],
//         rows: [
//           { label: "Standard", values: ["92", "34"] },
//           { label: "Long", values: ["100", "36"] },
//         ],
//       },
//     ],
//   },
// };

// type SizeChartDialogProps = {
//   collection: CollectionName;
// };

// export default function SizeChartDialog({ collection }: SizeChartDialogProps) {
//   const chart = SIZE_CHARTS[collection];

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" size="sm" className="gap-1 text-xs">
//           <Ruler className="h-4 w-4" aria-hidden="true" />
//           <span>Size guide</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-h-[80vh] w-[min(90vw,640px)] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>{chart?.heading ?? `Size guide`}</DialogTitle>
//           <DialogDescription>
//             {chart?.description ??
//               `We are preparing the size guide for ${collection}. Please check back soon.`}
//           </DialogDescription>
//         </DialogHeader>
//         {chart ? (
//           <div className="space-y-6">
//             {chart.tables.map((table) => (
//               <section key={table.title} className="space-y-3">
//                 <div>
//                   <h3 className="text-sm font-semibold">{table.title}</h3>
//                   {table.note ? (
//                     <p className="text-xs text-muted-foreground">{table.note}</p>
//                   ) : null}
//                 </div>
//                 <div className="overflow-x-auto rounded-md border">
//                   <table className="w-full min-w-[28rem] border-collapse text-sm">
//                     <thead className="bg-muted/60">
//                       <tr>
//                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">
//                           {table.columns[0]}
//                         </th>
//                         {table.columns.slice(1).map((column) => (
//                           <th
//                             key={column}
//                             className="px-3 py-2 text-left font-medium text-muted-foreground"
//                           >
//                             {column}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {table.rows.map((row) => (
//                         <tr key={row.label} className="even:bg-muted/40">
//                           <th
//                             scope="row"
//                             className="px-3 py-2 text-left font-medium"
//                           >
//                             {row.label}
//                           </th>
//                           {row.values.map((value, index) => (
//                             <td key={index} className="px-3 py-2 text-left">
//                               {value}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </section>
//             ))}
//           </div>
//         ) : (
//           <p className="text-sm text-muted-foreground">
//             Our size guide for this collection will be uploaded shortly.
//           </p>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }


























import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Product } from "@/data/products";
import { Ruler } from "lucide-react";

type CollectionName = Product["collection"];

type SizeTable = {
  title: string;
  note?: string;
  columns: [string, ...string[]];
  rows: Array<{ label: string; values: string[] }>;
};

type CollectionChart = {
  heading: string;
  description: string;
  tables: SizeTable[];
};

const SIZE_CHARTS: Record<CollectionName, CollectionChart> = {
  "✨ Bestsellers Edit": {
    heading: "Bestsellers Edit size guide",
    description:
      "Our most-loved pieces for kids. All measurements are in inches.",
    tables: [
      {
        title: "Kids' Sizes",
        columns: ["Size" ,"Age", "Top Length", "Chest", "Plazzo Length", "Waist"],
        rows: [
          { label: "XS", values: ["3-6 month" ,"8", "10", "15", "6"] },
          { label: "XS", values: ["1 Year" ,"9", "11", "16", "7"] },
          { label: "S", values: ["2 Year" ,"10", "11.5", "18", "7.5"] },
          { label: "S", values: ["3 Year" ,"11", "12", "20", "8"] },
          { label: "M", values: ["4 Year" ,"13", "13", "23", "9"] },
          { label: "M", values: ["5 Year" ,"13.5", "13.5", "25", "9.5"] },
          { label: "M", values: ["6 Year" ,"15", "13.5", "27", "10"] },
          { label: "L", values: ["7 Year" ,"17", "14", "29", "10.5"] },
          { label: "L", values: ["8 Year" ,"18", "14.5", "30", "11"] },
          { label: "XL", values: ["9 Year" ,"19", "15", "31", "11.5"] },
          { label: "XL", values: ["10 Year" ,"22", "16", "34", "12"] },
          { label: "XXL", values: ["11 Year" ,"23", "16.5", "35", "12.5"] },
          { label: "XXL", values: ["12 Year" ,"25", "17", "36", "13"] }          
        ],
      },
    ],
  },
  "🌸 New Arrivals": {
    heading: "New Arrivals size guide",
    description:
      "Fresh styles just landed! Measurements are garment dimensions in inches.",
    tables: [
      {
        title: "Women's Tops",
        columns: ["Size", "Bust", "Waist", "Length"],
        rows: [
          { label: "XS", values: ["32", "25", "24"] },
          { label: "S", values: ["34", "27", "25"] },
          { label: "M", values: ["36", "29", "26"] },
          { label: "L", values: ["39", "32", "27"] },
          { label: "XL", values: ["42", "35", "28"] },
        ],
      },
    ],
  },
  "❄ Winter Wonders": {
    heading: "Winter Wonders size guide",
    description:
      "Cozy, classy & winter-perfect outfits. Measurements are garment dimensions in inches.",
    tables: [
      {
        title: "Sweaters & Coats",
        columns: ["Size", "Chest", "Shoulder", "Sleeve", "Length"],
        rows: [
          { label: "S", values: ["38", "16.5", "23", "26"] },
          { label: "M", values: ["40", "17", "23.5", "27"] },
          { label: "L", values: ["42", "17.5", "24", "28"] },
          { label: "XL", values: ["44", "18", "24.5", "29"] },
        ],
      },
    ],
  },
  "☀ Summer Bloom": {
    heading: "Summer Bloom size guide",
    description:
      "Light, breezy & full of color. Measurements are garment dimensions in inches.",
    tables: [
      {
        title: "Casual Dresses",
        columns: ["Size", "Bust", "Waist", "Length"],
        rows: [
          { label: "XS", values: ["32", "25", "36"] },
          { label: "S", values: ["34", "27", "37"] },
          { label: "M", values: ["36", "29", "38"] },
          { label: "L", values: ["39", "32", "39"] },
          { label: "XL", values: ["42", "35", "40"] },
        ],
      },
    ],
  },
  "💍 The Wedding Season": {
    heading: "The Wedding Season size guide",
    description:
      "Festive looks for the little stars of every shaadi. Measurements are garment dimensions in inches.",
    tables: [
      {
        title: "Kids' Sherwanis & Dresses",
        columns: ["Age", "Chest", "Waist", "Length"],
        rows: [
          { label: "1-2", values: ["21", "19", "18"] },
          { label: "3-4", values: ["23", "20", "22"] },
          { label: "5-6", values: ["25", "21", "25"] },
          { label: "7-8", values: ["27", "23", "29"] },
          { label: "9-10", values: ["29", "24", "33"] },
        ],
      },
    ],
  },
  "🌙 Eid Collection": {
    heading: "Eid Collection size guide",
    description:
      "Celebrate joy in Rangista style! Measurements are garment dimensions in inches.",
    tables: [
      {
        title: "Women's Kurtas",
        columns: ["Size", "Bust", "Waist", "Hip", "Length"],
        rows: [
          { label: "XS", values: ["32", "25", "35", "36"] },
          { label: "S", values: ["34", "27", "37", "37"] },
          { label: "M", values: ["36", "29", "39", "38"] },
          { label: "L", values: ["39", "32", "42", "39"] },
          { label: "XL", values: ["42", "35", "45", "40"] },
        ],
      },
    ],
  },
  "🐐 Bakra Eid Edit": {
    heading: "Bakra Eid Edit size guide",
    description:
      "Celebrate love, sacrifice & style — the Rangista way. Measurements are garment dimensions in inches.",
    tables: [
      {
        title: "Family Sets",
        columns: ["Size", "Chest", "Waist", "Length"],
        rows: [
          { label: "S", values: ["38", "28", "40"] },
          { label: "M", values: ["40", "30", "41"] },
          { label: "L", values: ["42", "33", "42"] },
          { label: "XL", values: ["44", "36", "43"] },
        ],
      },
    ],
  },
  "Azadi Collection": {
    heading: "Azadi Collection size guide",
    description:
      "Celebrate Pakistan’s spirit in true Rangista style! Measurements are garment dimensions in inches.",
    tables: [
      {
        title: "Unisex Shirts",
        columns: ["Size", "Chest", "Shoulder", "Sleeve", "Length"],
        rows: [
          { label: "XS", values: ["36", "16", "22.5", "26"] },
          { label: "S", values: ["38", "16.5", "23", "27"] },
          { label: "M", values: ["40", "17", "23.5", "28"] },
          { label: "L", values: ["42", "17.5", "24", "29"] },
          { label: "XL", values: ["44", "18", "24.5", "30"] },
        ],
      },
    ],
  },
  "👩‍🍼 Mommy & Me": {
    heading: "Mommy & Me size guide",
    description:
      "Matching outfits for moms and their little ones. Measurements are garment dimensions in inches.",
    tables: [
      {
        title: "Women's Tops",
        columns: ["Size", "Bust", "Waist", "Length"],
        rows: [
          { label: "S", values: ["34", "27", "25"] },
          { label: "M", values: ["36", "29", "26"] },
          { label: "L", values: ["39", "32", "27"] },
        ],
      },
      {
        title: "Kids' Tops",
        columns: ["Age", "Chest", "Waist", "Length"],
        rows: [
          { label: "3-4", values: ["22", "21", "18"] },
          { label: "5-6", values: ["24", "22", "21"] },
          { label: "7-8", values: ["26", "23", "24"] },
        ],
      },
    ],
  },
  "👗 Adults Collection": {
    heading: "Adults Collection size guide",
    description:
      "Elegant & classy styles for all occasions. Measurements are garment dimensions in inches.",
    tables: [
      {
        title: "Women's Dresses",
        columns: ["Size", "Bust", "Waist", "Hip", "Length"],
        rows: [
          { label: "S", values: ["34", "27", "37", "38"] },
          { label: "M", values: ["36", "29", "39", "39"] },
          { label: "L", values: ["39", "32", "42", "40"] },
          { label: "XL", values: ["42", "35", "45", "41"] },
        ],
      },
    ],
  },
  "🎨 Handpainted Dupattas Collection": {
    heading: "Handpainted Dupattas Collection size guide",
    description:
      "Artistic dupattas, each piece handpainted with care. Sizes are approximate fabric measurements in inches.",
    tables: [
      {
        title: "Dupatta Dimensions",
        columns: ["Type", "Length", "Width"],
        rows: [
          { label: "Standard", values: ["92", "34"] },
          { label: "Long", values: ["100", "36"] },
        ],
      },
    ],
  },
};

type SizeChartDialogProps = {
  collection: CollectionName;
};

export default function SizeChartDialog({ collection }: SizeChartDialogProps) {
  const chart = SIZE_CHARTS[collection];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 text-xs">
          <Ruler className="h-4 w-4" aria-hidden="true" />
          <span>Size guide</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-[min(90vw,640px)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{chart?.heading ?? `Size guide`}</DialogTitle>
          <DialogDescription>
            {chart?.description ??
              `We are preparing the size guide for ${collection}. Please check back soon.`}
          </DialogDescription>
        </DialogHeader>
        {chart ? (
          <div className="space-y-6">
            {chart.tables.map((table) => (
              <section key={table.title} className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold">{table.title}</h3>
                  {table.note ? (
                    <p className="text-xs text-muted-foreground">{table.note}</p>
                  ) : null}
                </div>
                <div className="overflow-x-auto rounded-md border">
                  <table className="w-full min-w-[28rem] border-collapse text-sm">
                    <thead className="bg-muted/60">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          {table.columns[0]}
                        </th>
                        {table.columns.slice(1).map((column) => (
                          <th
                            key={column}
                            className="px-3 py-2 text-left font-medium text-muted-foreground"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row) => (
                        <tr key={row.label} className="even:bg-muted/40">
                          <th
                            scope="row"
                            className="px-3 py-2 text-left font-medium"
                          >
                            {row.label}
                          </th>
                          {row.values.map((value, index) => (
                            <td key={index} className="px-3 py-2 text-left">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Our size guide for this collection will be uploaded shortly.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
