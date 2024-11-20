"use client";

import { getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "./constants/contracts";
import CampaignCard from "./components/CampaignCard";

export default function Home() {
  const contract = getContract({
    client: client,
    chain: sepolia,
    address: CROWDFUNDING_FACTORY,
  });
  const {
    data: campaigns,
    isLoading: isLoadingCampaigns,
    refetch: refetchCampaigns,
  } = useReadContract({
    contract,
    method:
      "function getAllCampaings() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [],
  });
  return (
    <main className="px-4 max-w-7xl mx-auto mt-4 sm:px-6 lg:px-8">
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-4">Campaigns:</h1>
        <div className="grid grid-cols-3 gap-4">
          {!isLoadingCampaigns &&
            campaigns &&
            (campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.campaignAddress}
                  campaignAddress={campaign.campaignAddress}
                />
              ))
            ) : (
              <p>No Campaigns</p>
            ))}
        </div>
      </div>
    </main>
  );
}
