

const Navbar = () => {
    const navIteam = [
        { link: "Trang Chủ", path: 'trangchu' },
        { link: "Sản Phẩm", path: 'sanpham' },
        { link: "Tin Tức", path: 'tintuc' },
        { link: "Giới Thiệu", path: 'gioithieu' },
      ];
  return (
    <div>
          <ul className='md:flex space-x-12 justify-center text-xl'>
            {
              navIteam.map(({ link, path }) => <a key={link} href={path} className=' block hover:text-gray-300 mr-4'>{link}</a>)
            }
          </ul>
        </div>
  )
}

export default Navbar