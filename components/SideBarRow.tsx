import React, { SVGProps } from 'react'

interface PropsI{
  Icon:(props: SVGProps<SVGSVGElement>) => JSX.Element,
  title:string,
  logout?:()=>void
}


const SideBarRow = ({Icon,title,logout}:PropsI) => {
  return (
    <div onClick={logout} className="flex items-center space-x-5  hover:bg-[#E7E7E8] max-w-fit py-4 px-4  rounded-[10rem] cursor-pointer ">
 <Icon color='#0F1419' className='h-12 w-12'/>
 <p  className='text-[2rem] hidden lg:block text-[#0F1419]'>{title}</p>
    </div>
  )
}

export default SideBarRow