import { IconProps } from './types'

export function IconBookmark({ className, ...props }: IconProps) {
   return (
      <svg version="1.0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
         <path d="M182.6 53.6c-3.4 1.1-6.4 3.1-10.2 6.8-7.6 7.6-8.4 11.1-8.4 35.8V116h-19.8c-24.7 0-28.2.8-35.8 8.5-9.2 9.1-8.5-5.5-8.2 172.3l.3 156.2 3.3 3.2c2.7 2.8 4 3.3 8 3.3 4.7 0 5.8-.7 58.5-38.4l53.7-38.3 53.7 38.3c52.7 37.7 53.8 38.4 58.5 38.4 4 0 5.3-.5 8-3.3l3.3-3.2.5-45.6.5-45.6 23.5 16.9c22.5 16.1 23.6 16.8 28.2 16.8 4 0 5.3-.5 8-3.3l3.3-3.2.3-156.3c.3-177.9 1-163-8.3-172.2-9-9.1-1.4-8.5-115.9-8.4-86 0-100.8.3-105 1.5zm204.2 23.6c.9.9 1.2 33.8 1.2 142 0 77.4-.2 140.8-.5 140.8s-9.3-6.3-20-14.1l-19.5-14v-95.8c0-109.6.5-102.6-8.5-111.6-8.8-8.8-5.5-8.5-83.6-8.5H188V97.2c0-13.3.4-19.2 1.2-20 1.7-1.7 195.9-1.7 197.6 0zm-64 64c.9.9 1.2 33.8 1.2 142.1 0 77.5-.4 140.7-.8 140.5-.5-.2-22-15.4-47.7-33.8-45.2-32.3-47.1-33.5-51.5-33.5-4.4 0-6.3 1.2-51.5 33.5-25.7 18.4-47.2 33.6-47.7 33.8-.4.2-.8-63-.8-140.5 0-108.3.3-141.2 1.2-142.1 1.7-1.7 195.9-1.7 197.6 0z" />
      </svg>
   )
}