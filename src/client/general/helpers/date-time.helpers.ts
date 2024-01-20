/** `("2023-10-16T11:48:16.421Z") => "2023-10-16 11:48:16"` */
export function getHumanReadableDate(isoDate: string): string {
   return isoDate.replace('T', ' ').slice(0, 19)
}
