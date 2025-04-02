import React from 'react'
import Hero from './homeuitils/Hero'
import TabNavigator from './homeuitils/TabNavigator'
import SubscribeSection from './homeuitils/SubscribeSection'
import DilerSection from './homeuitils/DilerSection'
import axios from 'axios'
import { api, SeoInterface } from '../../hooks/useRequests'
import { useRecoilValue } from 'recoil'
import { SelectedLanguageState } from '../../recoil/Atom'
import { Helmet } from 'react-helmet-async'

const Home: React.FC = () => {

  const lang = useRecoilValue(SelectedLanguageState);
  const [seoData, setSeoData] = React.useState<SeoInterface>();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/home-seo-front`, {
          headers: {
            "Accept-Language": lang
          }
        });
        if (response.data) {
          setSeoData(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [lang]);

  return (
    <main className='home'>
      <Helmet>
        <title>{seoData?.meta_title || "Kaiyi"}</title>
        <meta name='title' content={seoData?.meta_description || ""} />
      </Helmet>
      <Hero />
      <TabNavigator />
      <SubscribeSection />
      <DilerSection />
    </main>
  )
}

export default Home