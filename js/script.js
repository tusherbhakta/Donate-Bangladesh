let balance = 9000;
document.getElementById('balanceAmount').innerText = balance;
document.getElementById('btn-donation').addEventListener('click',function(){
    document.getElementById('donation-section').classList.remove('hidden');
    document.getElementById('history-section').classList.add('hidden');
    toggleButtonActive('btn-donation','btn-history');
});
document.getElementById('btn-history').addEventListener('click',function(){
    document.getElementById('donation-section').classList.add('hidden');
    document.getElementById('history-section').classList.remove('hidden');
    toggleButtonActive('btn-history','btn-donation');
});
// Toggle button 
function toggleButtonActive(activeId, inactiveId) {
    document.getElementById(activeId).classList.remove('border-gray-500');
    document.getElementById(activeId).classList.add('bg-lime', 'text-text-primary', 'border-lime');
    document.getElementById(inactiveId).classList.remove('bg-lime', 'text-text-primary', 'border-lime');
    document.getElementById(inactiveId).classList.add('border', 'border-gray-500', 'text-black');
}
//  functionality of donation
function donate(cardNo) {
    const donationInput = document.getElementById(`donation-input${cardNo}`);
    const donationAmount = parseFloat(donationInput.value);

    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (donationAmount > balance) {
        alert('Insufficient balance.');
        return;
    }

    // Deduct balance
    balance -= donationAmount;
    document.getElementById('balanceAmount').textContent = balance;

    // Update donation amount
    const currentDonation = document.getElementById(`donation${cardNo}`);
    const newDonationAmount = parseFloat(currentDonation.textContent) + donationAmount;
    currentDonation.textContent = newDonationAmount;


    addToHistory(donationAmount, cardNo);

    donationInput.value = '';

    my_modal_4.showModal();
}
function addToHistory(donationAmount, cardNo) {
    const historyList = document.getElementById('history-ul');
    const timestamp = new Date().toString();
    let message;

    // Define the donation message based on the card ID
    if (cardNo === 1) {
        message = 'Flood Relief in Noakhali, Bangladesh';
    } else if (cardNo === 2) {
        message = 'Flood Relief in Feni, Bangladesh';
    } else if (cardNo === 3) {
        message = 'Aid for Injured in the Quota Movement, Bangladesh';
    }

    // Create the transaction card
    const transactionCard = `
        <div class="p-4 md:p-8 border-gray-300 border rounded-xl mt-4 md:mt-8">
            <div class="space-y-3">
                <h2 class="text-text-primary font-bold text-xl">
                    <span>${donationAmount}</span> Taka is Donated for <span>${message}</span>
                </h2>
                <p class="text-text-gray">Date: <span>${timestamp}</span></p>
            </div>
        </div>
    `;

    // Insert the transaction card as HTML into the history section
    historyList.insertAdjacentHTML('beforeend', transactionCard);
}