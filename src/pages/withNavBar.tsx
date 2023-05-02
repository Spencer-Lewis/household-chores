import NavBar from 'components/NavBar'

const withNavBar = (Component: any) => () => {
	return (
		<div>
			<Component />
			<NavBar />
		</div>
	)
}

export default withNavBar
