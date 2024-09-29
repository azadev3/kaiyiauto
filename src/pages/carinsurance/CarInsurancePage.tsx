import React from 'react'

const CarInsurancePage:React.FC = () => {
  return (
     <main className="insurance-wrapper">
      <div className="insurance-page">
        <div className="image-contain" style={{ backgroundImage: "url('/car7.jpeg')" }}>
          <div className="wrapper">
            <h1>Favorable CASCO ratesfrom SberStrakhovanie</h1>
          </div>
        </div>

        <div className="description-insurance">
          <p>Favorable interest rate for CASCO under the promotional program of SberBank Insurance when purchasing new KAIYI cars on credit using borrowed funds from Drive Click Bank LLC in the official dealer network of KAI RUS LLC.</p>
        </div>


      </div>
    </main>
  )
}

export default CarInsurancePage