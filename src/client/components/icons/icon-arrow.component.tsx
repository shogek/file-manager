import { IconProps } from './types'

export function IconArrow({ className, ...props }: IconProps) {
   return (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
         <path d="M248 65.6c-4.5 2-8.7 5.9-11.1 10.6-1.8 3.6-1.9 8-1.9 151.5v147.8l-58.7-58.7c-50.3-50.2-59.4-58.8-62.8-59.7-6.3-1.7-10.7-1.3-16.4 1.5-9 4.5-13.3 13.9-11 23.9 1.1 4.9 3 6.9 79.3 83.3 42.9 43.1 79.5 79.1 81.1 80 1.9 1 5.3 1.6 9.5 1.6s7.6-.6 9.5-1.6c1.7-.9 38.2-36.9 81.1-80 76.3-76.4 78.2-78.4 79.3-83.3 2.3-10-2-19.4-11-23.9-5.7-2.8-10.1-3.2-16.4-1.5-3.4.9-12.5 9.5-62.7 59.7L277 375.5V227.7c0-143.5-.1-147.9-1.9-151.5-5.3-10.2-17.2-14.9-27.1-10.6z" />
      </svg>
   )
}
