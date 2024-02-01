import { IconProps } from './types'

export function IconFolder({ className, ...props }: IconProps) {
   return (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
         <path d="M67.5 70.8c-10.8 3.7-20.8 12-25.4 21C36.8 102.1 37 97.2 37 240c0 146.3-.3 138.8 6.3 149.9 4.2 7 11.3 13.3 19.5 17.3l6.7 3.3 162 .3c159.8.2 162.1.2 168.6-1.8 12.5-3.8 23.4-14.3 27.8-27 1.1-3 12-37.5 24.3-76.5l22.3-71v-10c0-9.5-.2-10.4-3.7-17.8-8-16.8-23.1-25.7-43.4-25.7H421v-16.3c0-17.8-1.2-24.5-5.7-32.9-3.2-5.9-10.1-13-15.9-16.4-10.2-6-7.6-5.8-85.9-6.4-68.2-.5-72.2-.6-75.5-2.4-1.9-1-9.8-8-17.5-15.6-7.7-7.5-16-14.8-18.5-16.2-10-5.8-10.3-5.8-72.4-5.8-51.5.1-57.6.2-62.1 1.8zM192 87.4c1.9 1 9.8 8 17.5 15.5 14.3 14 17.9 16.8 25.6 19.8 4 1.6 10.9 1.8 76.4 2.3l72 .5 5.7 2.8c3.2 1.6 7.3 4.7 9.3 7 5.3 6.2 6.5 11.5 6.5 29.9V181H264.2c-97.6 0-142.7.3-146.8 1.1-3.2.6-8.4 2.2-11.4 3.7-6.7 3.1-16.8 13-19.8 19.2-1.1 2.5-8.6 25.4-16.7 51-8 25.6-14.9 47.6-15.4 49-.6 1.5-.9-36.8-.8-99l.2-101.5 3-5.4c3.1-5.6 8.8-10.5 14.8-12.8 2.4-.9 18.2-1.1 60.2-1 53.9.2 57.2.3 60.5 2.1zm250.8 112.5c10.5 4.7 17 15.8 15.9 27-.8 7.9-45.9 151.3-49.1 156.1-3 4.6-8.3 8.8-13.3 10.6-3.1 1.1-32.5 1.3-162.8 1.3-157.7.1-159 0-163.5-2-9.8-4.4-16-13.3-16.7-23.9-.4-6.2.6-9.8 23-81.3 15.5-49.2 24.3-76.1 26.1-78.7 3.2-4.8 9.1-8.9 15.4-10.6 3.7-1 37.5-1.2 162.2-1.1l157.5.2 5.3 2.4z" />
      </svg>
   )
}
