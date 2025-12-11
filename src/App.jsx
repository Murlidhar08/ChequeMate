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
          width: "21cm",
          height: "9cm",
          // set a consistent DPI-friendly fallback min width in px for screen editing
        }}
      />
    </div>
  )
}

export default App
