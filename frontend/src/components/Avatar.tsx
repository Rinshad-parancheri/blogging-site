interface AvatarProp {
  authorFirstLetter: string,
  appBar?: boolean
}
const Avatar = ({ authorFirstLetter, appBar = false }: AvatarProp) => {
  return (

    <div className="">
      <span className={`inline-flex items-center justify-center size-[38px]  size-[${appBar ? 48 : 38}]px rounded-full bg-gray-500 font-semibold text-${appBar ? 'xl' : 'lg'} text-white leading-none`}>
        {authorFirstLetter.toUpperCase()}
      </span>
    </div >

  )
}

export default Avatar
