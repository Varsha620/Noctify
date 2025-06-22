import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function ExpenseTrack() {
  return (
    <div className="min-h-screen w-full bg-[#ffffff] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-4">
        <Navbar />

        <h2 className="text-3xl font-light text-[#424495] mt-6 mb-4 ml-2">EXPENSE TRACK</h2>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left Column */}
          <div className="flex flex-col flex-1 gap-4">
            {/* Average Spend Card */}
            <div className="bg-gradient-to-br from-[#544ECD] to-[#2A2767] text-white rounded-2xl shadow-xl p-6 min-h-[180px]">
                <div className="flex flex-col gap-3">
                    <svg width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M57.5 67.0833C57.5 63.2708 59.0145 59.6145 61.7103 56.9187C64.4062 54.2228 68.0625 52.7083 71.875 52.7083H91.0417C93.5833 52.7083 96.0209 53.718 97.8181 55.5152C99.6153 57.3124 100.625 59.75 100.625 62.2916V71.875C100.625 74.4166 99.6153 76.8542 97.8181 78.6514C96.0209 80.4486 93.5833 81.4583 91.0417 81.4583H71.875C68.0625 81.4583 64.4062 79.9438 61.7103 77.248C59.0145 74.5521 57.5 70.8958 57.5 67.0833ZM71.875 62.2916C70.6042 62.2916 69.3854 62.7965 68.4868 63.6951C67.5882 64.5937 67.0833 65.8125 67.0833 67.0833C67.0833 68.3541 67.5882 69.5729 68.4868 70.4715C69.3854 71.3701 70.6042 71.875 71.875 71.875H91.0417V62.2916H71.875Z" fill="#EEEEFF" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M58.904 15.779C59.8025 14.8807 61.0211 14.376 62.2917 14.376C63.5622 14.376 64.7808 14.8807 65.6794 15.779L78.6504 28.75H65.0996L58.904 22.5544C58.0057 21.6558 57.501 20.4372 57.501 19.1667C57.501 17.8961 58.0057 16.6775 58.904 15.779ZM59.4837 28.75L46.5127 15.779C45.6141 14.8807 44.3956 14.376 43.125 14.376C41.8544 14.376 40.6359 14.8807 39.7373 15.779L26.7663 28.75H59.4837ZM21.9746 33.5417L21.7063 33.8052C19.6157 34.3106 17.7559 35.5046 16.4261 37.1951C15.0964 38.8856 14.3739 40.9742 14.375 43.125V91.0417C14.375 93.5833 15.3847 96.0209 17.1819 97.8181C18.9791 99.6153 21.4167 100.625 23.9583 100.625H81.4583C84 100.625 86.4375 99.6153 88.2348 97.8181C90.032 96.0209 91.0417 93.5833 91.0417 91.0417H71.875C65.5209 91.0417 59.427 88.5175 54.9339 84.0244C50.4408 79.5314 47.9167 73.4375 47.9167 67.0833C47.9167 60.7292 50.4408 54.6353 54.9339 50.1422C59.427 45.6492 65.5209 43.125 71.875 43.125H91.0417C91.0427 40.9742 90.3203 38.8856 88.9905 37.1951C87.6608 35.5046 85.801 34.3106 83.7104 33.8052L83.4421 33.5417H21.9746Z" fill="#EEEEFF" />
                    </svg>

                    <h3 className="ml-5 text-2xl font-light">Average spent this Month:</h3>
                    <p className="ml-5 text-3xl font-semibold">Rs.5,000</p>
                </div>
            </div>

            {/* Action Cards */}
            <div className="flex flex-row gap-4">
              <div className="flex flex-col justify-between bg-[#EEEEFF] p-6 rounded-2xl shadow-lg flex-1 mt-5"
              style={{boxShadow: '-5px 10px 20px #524CC7'}}>
                <div>
                  <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M60.75 10.125C63.3326 10.1249 65.8176 11.1116 67.6966 12.8833C69.5756 14.6551 70.7066 17.0779 70.8581 19.656L70.875 20.25V67.5C70.8748 68.0619 70.7344 68.6148 70.4664 69.1086C70.1984 69.6025 69.8114 70.0216 69.3404 70.328C68.8694 70.6344 68.3294 70.8183 67.7693 70.8632C67.2093 70.908 66.6468 70.8123 66.1331 70.5847L65.7281 70.3755L56.5312 64.7122L47.331 70.3755C46.8598 70.665 46.3246 70.8343 45.7726 70.8684C45.2205 70.9026 44.6686 70.8005 44.1653 70.5713L43.794 70.3755L34.5938 64.7122L25.3935 70.3755C24.9113 70.6723 24.3622 70.843 23.7967 70.8719C23.2313 70.9008 22.6676 70.787 22.1577 70.541C21.6477 70.2949 21.2079 69.9245 20.8787 69.4638C20.5494 69.0032 20.3413 68.4671 20.2736 67.905L20.25 67.5V47.25H13.5C12.6734 47.2499 11.8755 46.9464 11.2577 46.3971C10.64 45.8478 10.2453 45.0908 10.1486 44.2699L10.125 43.875V18.5625C10.1247 16.4203 10.9392 14.3582 12.4033 12.7945C13.8674 11.2307 15.8714 10.2824 18.009 10.1419L18.5625 10.125H60.75ZM50.625 40.5H37.125C36.2299 40.5 35.3715 40.8556 34.7385 41.4885C34.1056 42.1215 33.75 42.9799 33.75 43.875C33.75 44.7701 34.1056 45.6285 34.7385 46.2615C35.3715 46.8944 36.2299 47.25 37.125 47.25H50.625C51.5201 47.25 52.3785 46.8944 53.0115 46.2615C53.6444 45.6285 54 44.7701 54 43.875C54 42.9799 53.6444 42.1215 53.0115 41.4885C52.3785 40.8556 51.5201 40.5 50.625 40.5ZM18.5625 16.875C18.1149 16.875 17.6857 17.0528 17.3693 17.3693C17.0528 17.6857 16.875 18.1149 16.875 18.5625V40.5H20.25V18.5625C20.25 18.1149 20.0722 17.6857 19.7557 17.3693C19.4393 17.0528 19.0101 16.875 18.5625 16.875ZM54 27H37.125C36.2648 27.001 35.4374 27.3303 34.8119 27.9209C34.1864 28.5114 33.81 29.3185 33.7595 30.1772C33.7091 31.0359 33.9885 31.8815 34.5406 32.5412C35.0928 33.2008 35.8759 33.6248 36.7301 33.7264L37.125 33.75H54C54.8602 33.749 55.6876 33.4197 56.3131 32.8291C56.9386 32.2386 57.315 31.4315 57.3655 30.5728C57.4159 29.7141 57.1365 28.8685 56.5844 28.2088C56.0322 27.5492 55.2491 27.1252 54.3949 27.0236L54 27Z" fill="#4D6CDA"/>
                </svg>
                  <p className="mt-3 mb-5 ml-2 text-lg text-[#757575ec]">Split a new bill.</p>
                </div>
                <button className="mt-4 px-4 py-2 bg-gradient-to-br from-[#26356E] to-[#4967D4] text-white rounded-xl hover:brightness-90 text-sm w-fit">
                  Split Now →
                </button>
              </div>

              <div className="flex flex-col justify-between bg-[#EEEEFF] flex-1 p-6 shadow-lg rounded-2xl mt-5"
              style={{ boxShadow: '-5px 10px 20px #524CC7' }}>
                <div>
                  <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.16675 18.0834H51.6667M41.3334 5.16669L54.2501 18.0834L41.3334 31M56.8334 43.9167H10.3334M20.6667 31L7.75008 43.9167L20.6667 56.8334" stroke="#FF2929" stroke-width="7"/>
                </svg>
                  <p className="mt-3 mb-5 ml-2 text-lg text-[#757575ec]">Pay your pending bills.</p>
                </div>
                <button className="px-4 py-2 mt-4 text-sm text-white bg-gradient-to-br from-[#991919] to-[#FF2929] rounded-xl hover:brightness-90 w-fit">
                  Pay Now →
                </button>
              </div>
            </div>
          </div>

            
          {/* Transactions Panel */}
<div
  className="flex-1 rounded-2xl p-6 bg-[#EEEEFF]"
  style={{
    boxShadow: '-10px 8px 20px #3C3E87',
    minHeight: '370px',
  }}
>
  <div className="flex items-center justify-between mb-5 min-w-[250px]">
    <h4 className="text-2xl font-medium text-[#3C3E87]">Transactions</h4>
    <button className="text-sm text-[#3C3E87] hover:underline">See all</button>
  </div>

  <table className="w-full text-left">
    <thead className="text-[#3C3E87] font-medium border-b-2 border-[#3C3E87]">
      <tr className="text-md">
        <th className="pb-2">Members</th>
        <th className="px-4 pb-2">Amount</th>
        <th className="pb-2">Status</th>
      </tr>
    </thead>
    <tbody className="text-[#3C3E87] text-sm">
      {[
        { members: '👥👥👥', amount: 'Rs.500', status: 'Pending', color: 'bg-red-500' },
        { members: '👥👥👥👥', amount: 'Rs.5000', status: 'All Paid', color: 'bg-green-500' },
        { members: '👥👥👥', amount: 'Rs.500', status: 'Pending', color: 'bg-red-500' },
        { members: '👥👥👥👥', amount: 'Rs.300', status: 'All Paid', color: 'bg-green-500' },
      ].map((txn, idx) => (
        <tr key={idx} className="h-14">
          <td>
            <span className="bg-[#E0E0FF] px-3 py-1 rounded-full">{txn.members}</span>
          </td>
          <td className="px-4">{txn.amount}</td>
          <td>
            <span
              className={`px-3 py-1 rounded-full text-white text-xs ${txn.color}`}
            >
              {txn.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
      </div>
    </div>
  )
}

export default ExpenseTrack;
