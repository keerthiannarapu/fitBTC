# fitBTC: Turning Steps into Stacks
<p align="center">
  <img src="https://github.com/user-attachments/assets/7b572a34-354f-43b1-b317-204809415bb3" width="300" alt="image">
</p>

### Team Members: Kunal Malhan, Keerthana Goka, Naaz Nagori, Keerthi Annarapu, Naman Sighvi

# Project Overview: Google Fit Data Streaming with SIP-010 Token Rewards and Insurance Discounts

This project is a robust integration of blockchain technology with health and fitness data, enabling users to track their physical activity through Google Fit data and receive token-based rewards. The tokens can then be used as an incentive for healthier lifestyles, eligibility for insurance discounts, and other benefits. Leveraging the Stacks blockchain and Clarity smart contracts, we securely store, manage, and track fitness data along with token transactions, creating a transparent and user-driven rewards ecosystem.

[Link](https://www.canva.com/design/DAGWFzEnNIo/m9a4mjknNfQLZyWOfHensw/edit) to presentation on Canva

## Goals and Objectives
The primary objectives of this project are to:
1. *Integrate Health Data*: Collect and stream data from Google Fit to the blockchain, allowing users to securely store activity metrics like steps, calories burned, and heart rate.
2. *Reward System Using SIP-010 Tokens*: Mint SIP-010 tokens on the blockchain as rewards for reaching health milestones, incentivizing users to stay active.
3. *Eligibility for Insurance Discounts*: Based on token accumulation, users can qualify for insurance discounts, providing tangible benefits from their health efforts.
4. *Data Transparency and Security*: Store all fitness data and token transactions on the Stacks blockchain to ensure immutability, transparency, and security.

The solution combines a Clarity smart contract, a Python-based data streaming tool, and a React frontend interface using TypeScript to create an integrated, end-to-end health rewards application.

## Solution Components
The project is divided into three main components:

### 1. Clarity Smart Contract
The Clarity smart contract is the core of this project, managing both Google Fit data and SIP-010 token rewards. This contract, deployed on the Stacks blockchain, includes several functions for recording fitness data, minting rewards, managing token balances, and checking insurance eligibility.

*Key Functions*:
- *Google Fit Data Management*:
  - stream-data: Takes parameters for timestamp, steps, calories burned, and heart rate, and stores them in a blockchain map with the timestamp as the key, ensuring data integrity.
  - get-data: A read-only function to retrieve stored fitness data based on timestamp, allowing users or insurance providers to verify historical data.
- *SIP-010 Token Management*:
  - mint: Mints new SIP-010 tokens as rewards and updates the recipient’s balance on the blockchain. Users earn tokens based on their activity metrics.
  - transfer: Transfers SIP-010 tokens between accounts, enabling transactions for insurance payments or sharing rewards.
  - pay-insurance: Transfers tokens directly to a predefined insurance wallet, automating insurance payments.
- *Insurance Eligibility Check*:
  - eligible-for-discount: Checks if a user’s token balance meets a threshold for insurance discounts, providing flexibility for providers.

### 2. Python Script for Streaming Data
The Python script acts as an off-chain agent responsible for reading data from Google Fit (CSV format) and streaming it to the Clarity contract every 10 seconds.

*Key Steps in the Script*:
- *CSV Data Reading*: Reads Google Fit data (timestamp, steps, calories burned, heart rate) from a CSV file.
- *10-Second Streaming Interval*: Processes each row with a 10-second delay, simulating real-time data streaming.
- *Data Submission*: Integrates with the Stacks blockchain API to send data as transactions to the Clarity contract.

### 3. React Frontend with TypeScript
The frontend, built using React with TypeScript, provides an intuitive user interface for interacting with the blockchain.

*Key Features*:
- *Wallet Connection*: Allows users to connect their wallet using showConnect from @stacks/connect, enabling them to submit data and manage tokens.
- *Streaming Google Fit Data*: Users can input and stream their fitness data to the Clarity contract.
- *Token Minting and Balance Check*: The mintTokens function lets users convert accumulated BTC amounts into SIP-010 tokens, with balance checks for reward tracking.
- *Insurance Discount Eligibility*: The checkEligibility function queries the contract to determine insurance discount eligibility.

## Project Benefits and Applications
1. *Encourages Healthier Lifestyles*: Converts fitness metrics into tangible rewards.
2. *Automated Insurance Discounts*: Offers real-world financial savings.
3. *Transparency and Security*: Blockchain ensures data immutability.
4. *Scalable for Future Use Cases*: Potential to include additional metrics and wearable devices.

## Future Enhancements
1. *Real-Time API Integration*: Replace CSV uploads with live API data streaming from Google Fit.
2. *Smart Reward Algorithms*: Introduce dynamic rewards based on user goals or challenges.
3. *Expanded Insurance Options*: Collaborate with providers for blockchain-based, tailored insurance plans.

## Conclusion
This project represents an innovative solution for linking health metrics with blockchain-based rewards. By leveraging the Stacks blockchain, Clarity contracts, and SIP-010 tokens, we create an ecosystem that encourages healthy living and provides tangible benefits. This initiative sets the foundation for future integration between blockchain, health data, and personalized incentives.
