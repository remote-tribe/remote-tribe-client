import Cookies from 'js-cookie'

export const HomePage = () => {
	const username = Cookies.get('username')
	return (
		<div>
			<h1 className='text-5xl mt-20 text-center'>Hello {username ? username : 'World'}</h1>
		</div>
	)
}
