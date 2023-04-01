import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/layout/Layout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const [User, setUser] = useState();
	useEffect(() => {
		const authToken = Cookies.get('currentUser');

		if (authToken) {
			setUser(JSON.parse(authToken));
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, [router.pathname, isAuthenticated]);
	return (
		<Layout isAuth={isAuthenticated} currentUser={User}>
			<Component {...pageProps} />
		</Layout>
	);
}

MyApp.getInitialProps = async (appContext) => {
	const authToken = Cookies.get('currentUser');
	const isAuthenticated = !!authToken;

	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);
	}

	return { pageProps, isAuthenticated };
};

export default MyApp;
