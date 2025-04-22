import './App.css'
import Chat from './assets/img/icon-chat.webp'
import Money from './assets/img/icon-money.webp'
import Security from './assets/img/icon-security.webp'
import FeatureItem from './components/feature-item'
import BackgroundImage from './assets/img/bank-tree.webp'

function App() {

  return (
    <>
    <div className="hero" style={{backgroundImage: `url(${BackgroundImage})`}}>
      <section className="hero-content">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
    <section className='features'>
      <FeatureItem image={Chat} text='You are our #1 priority' subtext='Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.' />
      <FeatureItem image={Money} text='More savings means higher rates' subtext='The more you save with us, the higher your interest rate will be!' />
      <FeatureItem image={Security} text='Security you can trust' subtext='We use top of the line encryption to make sure your data and money is always safe.' />
    </section>
    </>
  )
}

export default App
