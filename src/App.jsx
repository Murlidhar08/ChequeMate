// Components
import ChequeDesigner from './components/ChequeDesigner.jsx'

function App() {
  return (
    <div className='bg-amber-200 min-h-screen flex justify-center items-center'>
      <ChequeDesigner />

      <img
        src="/images/Cheque.png"
        alt="Cheque"
        style={{
          // exact physical size: 21cm x 9cm
          width: "20.3cm",
          height: "8.6cm"
          // set a consistent DPI-friendly fallback min width in px for screen editing
        }}
      />
    </div>
  )
}

export default App
