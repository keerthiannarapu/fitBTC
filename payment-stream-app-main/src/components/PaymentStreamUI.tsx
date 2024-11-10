"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bitcoin, ArrowRight, Timer, Wallet, User } from "lucide-react";
import { showConnect, openContractCall } from "@stacks/connect";
import { userSession } from "@/lib/userSession";
import {
  uintCV,
  tupleCV,
  principalCV,
  PostConditionMode,
} from "@stacks/transactions";
import StreamBalance from "@/components/StreamBalance";

interface Stream {
  id: number;
  recipient: string;
  initialBalance: number;
  timeframe: {
    startBlock: number;
    stopBlock: number;
  };
  paymentPerBlock: number;
  startedAt: string;
  status: string;
}

const PaymentStreamUI = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  // Kpm Declare Variables Start
  const [name,            setName]            = useState('');
  const [age,             setAge]             = useState(27);
  const [bmi,             setBmi]             = useState(19); //
  const [height,          setHeight]          = useState(70);
  const [weight,          setWeight]          = useState(130);
  const [calories_burned, setCalories_burned] = useState(400); // Default Average
  const [gender,          setGender]          = useState(0);
  const [steps,           setSteps]           = useState(8000); // 
  const [systolic_bp,     setSystolic_bp]     = useState(120);
  const [cholesterol,     setCholesterol]     = useState(180);   // 160, 200, 240
  const [glucose,         setGlucose]         = useState(100);   // 80, 100, 130
  const [premium,         setPremium]         = useState(2000);  // 80, 100, 130
  const [health_score,    setHealth_score]    = useState(93.22);
  const [btc_market_price,setBtc_market_price]= useState(80000);
  // Kpm Declare Variables End

  const [btcAmount, setBtcAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState(
    "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5"
  );
  const [streamDuration, setStreamDuration] = useState("365");
  const [activeStep, setActiveStep] = useState(0);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setWalletConnected(true);
      setActiveStep(1);
    }
  }, []);

  const disconnectWallet = () => {
    userSession.signUserOut();
    setWalletConnected(false);
    setActiveStep(0);
  };

  const connectWallet = async () => {
    try {
      showConnect({
        userSession,
        appDetails: {
          name: "BTC Payment Stream",
          icon: window.location.origin + "/favicon.ico",
        },
        onFinish: () => {
          setWalletConnected(true);
          setActiveStep(1);
        },
        onCancel: () => {
          console.log("Wallet connection cancelled");
        },
      });
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };
  // KPM Webservice call start
  interface ApiResponse {
    data: any;
    message: string;
  }

  async function fetchGet(url: string, body: Record<string, any>): Promise<string> {

    const queryString = new URLSearchParams(body).toString();
    const fullUrl = `${url}?${queryString}`;

    fetch(fullUrl, {
      mode: 'no-cors',
      method: "GET"
    })
    .then(response => {
      if (!response.ok) {
        //throw new Error('Network response was not ok');
        // Error is due to CORS restriction. For Demo, in case of error default value is being used.
        return (Math.floor(Math.random() * (94 - 66 + 1)) + 66).toString();
      }
      console.log("Got...", response);
      return response.text(); // Assuming your API returns JSON
    })
    .then(data => {
      if (data === null) {
        console.error('API returned null');
      } else {
        console.log(data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    // This will reach due to CORS restriction. For Demo, in case of error default value is being used.
    return (Math.floor(Math.random() * (94 - 66 + 1)) + 66).toString();
  }

  async function fetchPost(url: string, body: Record<string, any>): Promise<string> {
    fetch(url, {
      mode: 'no-cors',
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Got...", response);
      return response.text(); // Assuming your API returns JSON
    })
    .then(data => {
      if (data === null) {
        console.error('API returned null');
      } else {
        console.log(data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    return "94.22";
  /*
    try {
      const response = await fetch(url, {
        mode: 'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(body),
      });
      console.log("Hello world..", response);
      if (response.ok != false) {
        throw new Error(`Error! status: ${response.status}`);
      }
      //const data: Response = await response;
      console.log("Hello world..", response);

      return "93.22"; //data.text();
    } catch (error) {
      //print("Kunal");
      console.log("Hello world!");
      console.error("Fetch POST error:", error);
      throw error;
    }*/
   /*
      const proxyUrl = "http://127.0.0.1:5000/predict_health_score_endpoint"; // Free CORS proxy (for development)
      try {
        const proxyResponse = await fetch(proxyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if (!proxyResponse.ok) {
          throw new Error(`Error! status: ${proxyResponse.status}`);
        }
  
        const proxyData: ApiResponse = await proxyResponse.json();
        return proxyData;
  
      } catch (proxyError) {
        console.error("Both direct and proxy fetch failed:", proxyError);
        throw proxyError;
      }*/
      
  }
  // KPM Webservice call end

  const handleUserProfile = async () => {
    if (!age || age > 99) {
      alert("Please enter a valid age (<=99).");
      return "";
    }

    setIsProcessing(true);
    try {
      // Step 1: Mock BTC deposit
      console.log("User Profile Input");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBmi(703*weight/height^2)

      fetchGet("http://127.0.0.1:5000/get_predict_health_score_endpoint", //?age=45&bmi=27&calories_burned=4500&gender=1&steps=3000&systolic_bp=130&cholesterol=200&glucose=85", 
        { "age":age, "bmi":bmi, "calories_burned":calories_burned, "gender":gender, "steps":steps, "systolic_bp":systolic_bp, "cholesterol":cholesterol, "glucose":glucose})
                    .then((response) => {console.log(response); setHealth_score(Number(response));})
                    .catch((error) => console.error(error));
      setBtcAmount((Math.floor(premium*health_score/5/100 * 100000000/btc_market_price)).toString());
      console.log("Premium", premium, health_score, btcAmount)
      setIsProcessing(false);
      setActiveStep(2);
    } catch (error) {
      console.error("User Profile error:", error);
      setIsProcessing(false);
    }
  };

  const handleBTCDeposit = async () => {
    if (!btcAmount || parseFloat(btcAmount) <= 0) {
      alert("Please enter a valid amount");
      return "";
    }

    setIsProcessing(true);
    try {
      // Step 1: Mock BTC deposit
      console.log("Mocking BTC deposit of", btcAmount, "BTC");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockBtcTxId = Math.random().toString(16).slice(2);
      console.log("Mock BTC Transaction:", mockBtcTxId);

      // Step 2: Call sBTC mint function
      await openContractCall({
        network: "devnet",
        contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        contractName: "sbtc-token",
        functionName: "mint",
        functionArgs: [
          uintCV(Math.floor(parseFloat(btcAmount) * 100000000)), // amount in sats
          principalCV("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"), // recipient
        ],
        postConditionMode: PostConditionMode.Allow,
        onFinish: (result) => {
          
          console.log("sBTC mint transaction:", result);
          setIsProcessing(false);
          setActiveStep(3);
        },
        onCancel: () => {
          console.log("sBTC mint cancelled");
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("BTC deposit error:", error);
      setIsProcessing(false);
    }
  };

  const createStream = async () => {
    if (!recipientAddress || !streamDuration || !btcAmount) {
      alert("Please fill all fields");
      return;
    }

    setIsProcessing(true);
    try {
      const sbtcAmount = Math.floor(parseFloat(btcAmount));
      const blocksPerDay = 24*60*6;
      const durationBlocks = parseInt(streamDuration) * blocksPerDay;

      const currentBlock = await fetch("http://localhost:3999/v2/info")
        .then((res) => res.json())
        .then((data) => data.stacks_tip_height);

      const paymentPerBlock = Math.floor(sbtcAmount / durationBlocks);

      const timeframeCV = tupleCV({
        "start-block": uintCV(currentBlock),
        "stop-block": uintCV(currentBlock + durationBlocks),
      });

      await openContractCall({
        network: "devnet",
        contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        contractName: "stream",
        functionName: "stream-to",
        functionArgs: [
          principalCV(recipientAddress),
          uintCV(sbtcAmount),
          timeframeCV,
          uintCV(paymentPerBlock),
        ],
        postConditionMode: PostConditionMode.Allow,
        onFinish: (result) => {
          console.log("Transaction ID:", result);

          // Create stream object for UI
          const newStream = {
            id: streams.length + 1,
            recipient: recipientAddress,
            initialBalance: sbtcAmount,
            timeframe: {
              startBlock: currentBlock,
              stopBlock: currentBlock + durationBlocks,
            },
            paymentPerBlock,
            startedAt: new Date().toISOString(),
            status: "active",
          };

          setStreams([...streams, newStream]);
          setActiveStep(4);
          setIsProcessing(false);
        },
        onCancel: () => {
          console.log("Transaction cancelled");
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("Stream creation error:", error);
      alert("Failed to create stream. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {walletConnected && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={disconnectWallet}
            className="text-sm"
          >
            Disconnect Wallet
          </Button>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[
          { title: "Connect Wallet", icon: Wallet },
          { title: "User Profile", icon: User },
          { title: "Reward for Health (per year)", icon: Bitcoin },
          { title: "Health Smart Contract", icon: Timer },
          { title: "Complete", icon: ArrowRight },
        ].map((step, index) => (
          <div
            key={step.title}
            className={`flex flex-col items-center space-y-2 ${
              index <= activeStep ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= activeStep ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            <span className="text-sm">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {activeStep === 0 && "Connect Your Wallet"}
            {activeStep === 1 && "User Profile"}
            {activeStep === 2 && "Reward for Health (per year)"}
            {activeStep === 3 && "Health Smart Contract Summary"}
            {activeStep === 4 && "Stream Created!"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeStep === 0 && (
            <Button onClick={connectWallet} className="w-full">
              Connect Leather Wallet
            </Button>
          )}

          {activeStep === 1 && (
            <>
              <div className="space-y-4">
                <div>
                  <table width='100%'><tbody><tr><td width='150px'>
                  <label className="block text-sm font-medium mb-2">
                    Name
                  </label></td><td>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  /></td></tr>
                  <tr><td width='150px'>
                  <label className="block text-sm font-medium mb-2">
                    Age (years)
                  </label></td><td>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="27"
                    step="1"
                    style={{ textAlign: 'right' }}
                  /></td></tr>
                  <tr><td width='150px'>
                  <label className="block text-sm font-medium mb-2">
                    Height (inches)
                  </label></td><td>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    placeholder="70"
                    step="1"
                    style={{ textAlign: 'right' }}
                  /></td></tr>
                  <tr><td width='150px'>
                  <label className="block text-sm font-medium mb-2">
                    Weight (lbs)
                  </label></td><td>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    placeholder="130"
                    step="1"
                    style={{ textAlign: 'right' }}
                  /></td></tr>
                  <tr><td width='250px'>
                  <label className="block text-sm font-medium mb-2">
                    Gender (0-Male, 1-Female)
                  </label></td><td>
                  <Input
                    type="number"
                    value={gender}
                    onChange={(e) => setGender(Number(e.target.value))}
                    placeholder="0"
                    step="1"
                    style={{ textAlign: 'right' }}
                  /></td></tr>
                  <tr><td width='150px'>
                  <label className="block text-sm font-medium mb-2">
                    Systolic BP (mmHg)
                  </label></td><td>
                  <Input
                    type="number"
                    value={systolic_bp}
                    onChange={(e) => setSystolic_bp(Number(e.target.value))}
                    placeholder="120"
                    step="5"
                    style={{ textAlign: 'right' }}
                  /></td></tr>
                  <tr><td width='150px'>
                  <label className="block text-sm font-medium mb-2">
                    Cholesterol (mg/dL)
                  </label></td><td>
                  <Input
                    type="number"
                    value={cholesterol}
                    onChange={(e) => setCholesterol(Number(e.target.value))}
                    placeholder="200"
                    step="20"
                    style={{ textAlign: 'right' }}
                  /></td></tr>
                  <tr><td width='150px'>
                  <label className="block text-sm font-medium mb-2">
                    Glucose (mg/dL)
                  </label></td><td>
                  <Input
                    type="number"
                    value={glucose}
                    onChange={(e) => setGlucose(Number(e.target.value))}
                    placeholder="100"
                    step="20"
                    style={{ textAlign: 'right' }}
                  /></td></tr>
                  <tr><td width='150px'>
                  <label className="block text-sm font-medium mb-2">
                    Premium ($)
                  </label></td><td>
                  <Input
                    type="number"
                    value={premium}
                    onChange={(e) => setPremium(Number(e.target.value))}
                    placeholder="2000"
                    step="50"
                    style={{ textAlign: 'right' }}
                  /></td></tr></tbody></table>
                </div>
                <Button
                  onClick={handleUserProfile}
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Submit User Health Profile"}
                </Button>
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-large mb-2">
                    <b>Congratulations!</b>
                  </label>
                  <label className="block text-sm font-medium mb-2">
                    <b>Health Score for {name} is {health_score}.</b>
                  </label>
                  <label className="block text-sm font-medium mb-2">
                    sBTC to Deposit as Rewards
                  </label>
                  <Input
                    type="number"
                    value={btcAmount}
                    onChange={(e) => setBtcAmount(e.target.value)}
                    placeholder="0.0"
                    step="0.00001"
                  />
                </div>
                <Button
                  onClick={handleBTCDeposit}
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Deposit sBTC"}
                </Button>
              </div>
            </>
          )}

          {activeStep === 3 && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  {btcAmount} sBTCs Loaded in your account!
                </AlertDescription>
              </Alert>

              <div>
                <label className="block text-sm font-medium mb-2">
                  User Address
                </label>
                <Input
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Recipient's Stacks address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Validity of loaded sBTCs
                </label>
                <Input
                  type="number"
                  value={streamDuration}
                  onChange={(e) => setStreamDuration(e.target.value)}
                  placeholder="Number of days"
                  readOnly
                />
              </div>

              <Button
                onClick={createStream}
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? "Creating Stream..." : "Conclude Health Smart Contract"}
              </Button>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Payment stream created successfully!
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Stream Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>{btcAmount} sBTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recipient:</span>
                    <span className="truncate ml-2">{recipientAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{streamDuration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600">Active</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setActiveStep(1);
                  setBtcAmount("");
                  setRecipientAddress("");
                  setStreamDuration("");
                }}
                className="w-full"
              >
                Create Another Stream
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Streams */}
      {streams.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Streams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {streams.map((stream) => (
                <div key={stream.id} className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Stream #{stream.id}</div>
                        <div className="text-sm text-gray-500">
                          To: {stream.recipient.slice(0, 8)}...
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{btcAmount} BTC</div>
                        <div className="text-sm text-gray-500">
                          {streamDuration} days
                        </div>
                      </div>
                    </div>
                  </div>
                  <StreamBalance
                    streamId={stream.id}
                    recipientAddress={stream.recipient}
                    initialBalance={stream.initialBalance}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentStreamUI;
