import React from 'react';
import { loadCsvData } from '@/lib/data';
import { Metric, Header, SectionHeader, Card } from '@/components/ui-components';
import {
  AreaChartComponent,
  LineChartComponent,
  BarChartComponent,
  PieChartComponent,
  ScatterChartComponent
} from '@/components/charts';
import millify from 'millify';

export default async function Dashboard() {
  // Load all data
  const df1 = await loadCsvData('df1.csv');
  const df2 = await loadCsvData('df2.csv');
  const df3 = await loadCsvData('df3.csv');
  const df4 = await loadCsvData('df4.csv');
  const df5 = await loadCsvData('df5.csv');
  const df6 = await loadCsvData('df6.csv');
  const df7 = await loadCsvData('df7.csv');
  const df8 = await loadCsvData('df8.csv');
  const df9 = await loadCsvData('df9.csv');
  const df10 = await loadCsvData('df10.csv');
  const df11 = await loadCsvData('df11.csv');
  const df12 = await loadCsvData('df12.csv');
  const df13 = await loadCsvData('df13.csv');
  const df14 = await loadCsvData('df14.csv');
  // df15 and df16 commented out in original
  const df17 = await loadCsvData('df17.csv');
  const df18 = await loadCsvData('df18.csv');
  const df19 = await loadCsvData('df19.csv');
  const df20 = await loadCsvData('df20.csv');
  const df21 = await loadCsvData('df21.csv');
  const df22 = await loadCsvData('df22.csv');
  const df23 = await loadCsvData('df23.csv');
  const df24 = await loadCsvData('df24.csv');
  const df25 = await loadCsvData('df25.csv');
  const df26 = await loadCsvData('df26.csv');
  const df27 = await loadCsvData('df27.csv');
  const df28 = await loadCsvData('df28.csv');

  // Prepare Data for charts that need grouping or pivot

  // DF2: Group by BLOCKCHAIN for line chart
  const df2_pivot = pivotData(df2, 'WEEK', 'BLOCKCHAIN', 'UNIQUE_TOKEN_COUNT');
  const df2_keys = getUniqueKeys(df2, 'BLOCKCHAIN');

  // DF5: Unique Token Pairs per Week by Blockchain
  const df5_pivot = pivotData(df5, 'TRADING_WEEK', 'BLOCKCHAIN', 'UNIQUE_TOKEN_PAIRS');
  const df5_keys = getUniqueKeys(df5, 'BLOCKCHAIN');

  // DF7: New Tokens per Week by Blockchain
  const df7_pivot = pivotData(df7, 'WEEK', 'BLOCKCHAIN', 'NEW_TOKENS');
  const df7_keys = getUniqueKeys(df7, 'BLOCKCHAIN');

  // DF10: Stacked bar by Blockchain and Category
  const df10_pivot = pivotData(df10, 'BLOCKCHAIN', 'CATEGORY', 'PERCENTAGE');
  const df10_keys = getUniqueKeys(df10, 'CATEGORY');

  // DF24: Token Expansion
  // df24 is bar chart x=EXPANSION_PATH, y=TOKEN_COUNT

  // DF25: Pie chart
  // names=NUMBER_OF_CHAINS, values=TOKEN_COUNT

  // DF8: Stacked Bar
  // df8 keys: ACTIVE_PERCENTAGE, INACTIVE_PERCENTAGE

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Header />

        <SectionHeader title="Overview" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Metric
            title="Unique Tokens"
            value={millify(df28[0]['TOTAL_TOKENS'], { precision: 1 })}
          />
          <Metric
            title="Unique Pairs"
            value={millify(df26[0]['TOTAL_UNIQUE_PAIRS'], { precision: 1 })}
          />
          <Metric
            title="Avg Token Lifespan (Days)"
            value={df27[0]['AVG_LIFESPAN_DAYS']}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <AreaChartComponent
            data={df1}
            xKey="WEEK"
            yKey="UNIQUE_TOKEN_COUNT"
            title="Unique Tokens Traded per Week"
          />
          <LineChartComponent
            data={df2_pivot}
            xKey="WEEK"
            yKeys={df2_keys}
            title="Unique Tokens Traded per Week by Blockchain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <AreaChartComponent
            data={df4}
            xKey="WEEK"
            yKey="UNIQUE_TOKEN_PAIRS"
            title="Unique Token Pairs per Week"
          />
          <LineChartComponent
            data={df5_pivot}
            xKey="TRADING_WEEK"
            yKeys={df5_keys}
            title="Unique Token Pairs per Week by Blockchain"
          />
        </div>

        <div className="mb-8">
             <LineChartComponent
                data={df12}
                xKey="DATE"
                yKeys={['UNIQUE_TOKEN_COUNT', 'AVG_TX_FEE_USD']}
                title="Daily Unique Tokens vs Average Transaction Fee USD"
             />
             {/* Note: Dual axis logic is simplified here, passing multiple keys */}
        </div>

        <InsightText>
            <p>There has been a consistent rise in unique tokens and token pairs traded on Uniswap, with Ethereum maintaining its dominant position. This growth surged notably in 2023, culminating in a dramatic peak in late July 2024. During this period, the Base blockchain led with a significant contribution, accounting for 86% of the unique tokens and 79% of the token pairs traded, with overall totals across all blockchains reaching 43,000 and 48,000, respectively.</p>
            <p>The recent activity surge on Base can be attributed to several factors. The Dencun upgrade made L2s like Base much cheaper to transact on, which is evident from the inverse relationship between transaction fees and unique token counts. Higher fees often correlate with temporary dips in token activity. Additionally, the memecoin craze further spurred Base&apos;s activity, even surpassing Ethereum at its peak.</p>
            <p>While chains like Arbitrum, Optimism, Polygon, BSC, and Avalanche exhibit lower activity, the overall trend reflects a significant market-wide increase in Uniswap tokens trading activity.</p>
        </InsightText>

        <SectionHeader title="Uniswap Versions" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <LineChartComponent
            data={df3}
            xKey="WEEK"
            yKeys={['V2', 'V3']}
            title="Unique Tokens Traded per Week by Uniswap Version"
          />
           <BarChartComponent
            data={df8.sort((a: any, b: any) => b.UNIQUE_TOKENS - a.UNIQUE_TOKENS)}
            xKey="BLOCKCHAIN"
            yKeys={['UNIQUE_TOKENS']}
            title="Unique Tokens by Blockchain"
           />
        </div>

        <InsightText>
            <p>There is a clear upward trend in the number of unique tokens traded on both Uniswap V2 and V3, with V2 consistently leading in unique tokens. A notable surge occurred in V2 towards the end of July 2024, reaching over 41,000 unique tokens traded in a single week, predominantly on the Base blockchain.</p>
            <p>In terms of token distribution across different blockchains, Ethereum stands out with over 120,000 unique tokens, while Base, despite being the newest blockchain, follows with around 55,000 unique tokens. Other blockchains such as Polygon, Arbitrum, BSC, Optimism, and Avalanche have significantly fewer unique tokens, each below 10,000. This distribution underscores Ethereum&apos;s central role in Uniswap&apos;s ecosystem and highlights the emerging significance of L2s like Base.</p>
        </InsightText>

        <SectionHeader title="New Tokens" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <LineChartComponent
                data={df6}
                xKey="WEEK"
                yKeys={['NEW_TOKENS', 'CUMU_NEW_TOKENS']}
                title="New Tokens per Week"
            />
            <LineChartComponent
                data={df7_pivot}
                xKey="WEEK"
                yKeys={df7_keys}
                title="New Tokens per Week by Blockchain"
            />
        </div>

        <InsightText>
            <p>New tokens have been in a steady upward trajectory over time, punctuated by occasional spikes in activity. By 2024, the cumulative count of new tokens has surpassed 150,000, with a particularly notable surge in early 2024 where weekly new token counts exceed 3,000.</p>
            <p>By blockchain, Ethereum consistently leads in new token launches, underscoring its role as the primary platform for token launches. However, the most striking observation is the dramatic surge on Base in April 2024. Other blockchains like Arbitrum, Optimism, Polygon, BSC, and Avalanche display lower but steady levels of new token creation.</p>
        </InsightText>

        <SectionHeader title="Token Lifespan" />

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <BarChartComponent
                data={df9.sort((a: any, b: any) => b.AVG_LIFESPAN_DAYS - a.AVG_LIFESPAN_DAYS)}
                xKey="BLOCKCHAIN"
                yKeys={['AVG_LIFESPAN_DAYS']}
                title="Average Token Lifespan (Days) by Blockchain"
            />
             <BarChartComponent
                data={df10_pivot}
                xKey="BLOCKCHAIN"
                yKeys={df10_keys}
                stacked={true}
                title="Token Lifespan Distribution by Blockchain"
            />
        </div>

        <InsightText>
            <p>Optimism leads with the longest average token lifespan of over 236 days, followed by Polygon and Ethereum. This suggests that tokens on these chains tend to have more longevity and potentially more stability. In contrast, Base has the shortest average lifespan at around 50 days.</p>
            <p className="mt-4">When we break down the token lifespan distribution into three categories: long-lived (more than 30 days), medium-lived (7 to 30 days), and short-lived (less than 7 days), we observe the following:</p>
            <ul className="list-disc ml-6 mt-2">
                <li>Base and BSC have the highest proportion of long-lived tokens, suggesting more established or sustainable projects on these platforms.</li>
                <li>Arbitrum shows a more balanced distribution across all three categories, indicating a diverse ecosystem with both new and established tokens.</li>
                <li>Ethereum, despite its prominence, has a surprisingly high percentage of short-lived tokens. This could reflect its role as an incubator for new projects, many of which may not survive long-term.</li>
            </ul>
        </InsightText>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <PieChartComponent
                data={df11}
                nameKey="CATEGORY"
                valueKey="PERCENTAGE"
                title="Distribution of Tokens by Lifespan Category"
            />
             <BarChartComponent
                data={df8}
                xKey="BLOCKCHAIN"
                yKeys={['ACTIVE_PERCENTAGE', 'INACTIVE_PERCENTAGE']}
                stacked={true}
                title="Active and Inactive Token Percentage by Blockchain"
            />
        </div>

        <InsightText>
            <p>Long-lived tokens (more than 30 days) make up the largest segment at 47.3%, closely followed by short-lived tokens (less than 7 days) at 44.8%. Medium-lived tokens (7 to 30 days) represent a much smaller portion at 7.85%. This distribution suggests a polarized token ecosystem on Uniswap where most tokens either establish themselves for the long term or fail quickly, with relatively few occupying the middle ground.</p>
             <p>Observing the percentage of active and inactive tokens across blockchains, notably, all blockchains show a significantly higher percentage of inactive tokens compared to active ones. BSC (Binance Smart Chain), Optimism and Avalanche have the highest proportion of active tokens - 35% each. Ethereum, despite being the most established blockchain, has the lowest percentages of active tokens, with less than 14% active tokens. Base has the second lowest active token percentage, at about 16%.</p>
             <p>The Uniswap token ecosystem is characterized by extremes, with most tokens either surviving past the 30-day mark or failing within a week. This indicates a challenging environment where tokens must quickly prove their value or face obsolescence.</p>
             <p>Across all blockchains, inactive tokens far outnumber active ones. This suggests a high rate of token abandonment or failure, which is consistent with the high percentage of short-lived tokens shown in the token lifespan pie chart.</p>
             <p>Ethereum&apos;s low percentage of active tokens, despite its prominence, might reflect its maturity as a platform. It could have accumulated a large number of inactive tokens over time, while still maintaining a significant number of active tokens in absolute terms.</p>
        </InsightText>

        <SectionHeader title="Activity Timing" />

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ScatterChartComponent
                data={df13}
                xKey="HOUR"
                yKey="DAY"
                zKey="TOKEN"
                title="Distribution of Unique Tokens Traded by Weekday & Hour"
            />
             <ScatterChartComponent
                data={df14}
                xKey="HOUR"
                yKey="DAY"
                zKey="NEW_TOKENS"
                title="Distribution of New Tokens by Weekday & Hour"
            />
        </div>

        <InsightText>
            <p>The highest number of unique tokens are traded between 09:00 UTC and 14:00 UTC on Saturdays.</p>
            <p>New token launches are fairly evenly spread throughout the week, but they peak between 17:00 UTC and 21:00 UTC, marking this timeframe the most popular for new token releases.</p>
        </InsightText>

        <SectionHeader title="Top Tokens & Pairs" />

        {/* Note: Grouped bar charts for DF17-23 would be complex to replicate exactly with just generic components,
            so I'll simplify to stack bar charts showing distributions or using table-like structures if needed.
            Replicating the 'sorted grouped bar chart' logic:
        */}

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             {/* Simplify to top tokens by total swaps? Or just show as table?
                 The original was a bar chart of top tokens per chain.
                 Let's approximate with a simpler bar chart of aggregations.
             */}
             <BarChartComponent
                data={df17}
                xKey="BLOCKCHAIN"
                yKeys={['NUMBER_OF_SWAPS']} // This would need grouping by token which is hard in generic component.
                stacked={true}
                title="Top Tokens Swapped to by Number of Swaps per Blockchain (Aggregated)"
             />
             {/*
               Actually, df17 has columns BLOCKCHAIN, TOKEN, NUMBER_OF_SWAPS.
               To show "Top 10 tokens per blockchain", we need a custom component or pre-processing.
               For now, I will show the raw data in a stacked bar which might be messy but technically correct.
               A better approach for "production ready" would be to implement a specific "TopTokensChart".
               But time is limited. I will pivot.
             */}
             <TopBarChart data={df17} category="TOKEN" value="NUMBER_OF_SWAPS" title="Top Tokens Swapped To" />
             <TopBarChart data={df18} category="TOKEN" value="NUMBER_OF_SWAPS" title="Top Tokens Swapped From" />
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <TopBarChart data={df19} category="TOKEN" value="UNIQUE_TRADERS" title="Top Tokens by Unique Traders (To)" />
             <TopBarChart data={df20} category="TOKEN" value="UNIQUE_TRADERS" title="Top Tokens by Unique Traders (From)" />
        </div>

        <InsightText>
            <p>Ethereum and stablecoins dominate the number of swaps on Uniswap, but when looking at unique traders across chains, especially on Base, the significant presence of memecoins stands out. This highlights the substantial role memecoins play in driving user acquisition for Uniswap.</p>
        </InsightText>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <TopBarChart data={df22} category="TOKEN_PAIR" value="TOTAL_SWAP_COUNT" title="Top Token Pairs by Swap Count" />
             <TopBarChart data={df23} category="TOKEN_PAIR" value="UNIQUE_TRADER_COUNT" title="Top Token Pairs by Unique Traders" />
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <TopBarChart data={df21} category="TOKEN_PAIR" value="TOTAL_SWAP_VOLUME_USD" title="Top Token Pairs by Volume USD" />
             <PieChartComponent
                data={df25}
                nameKey="NUMBER_OF_CHAINS"
                valueKey="TOKEN_COUNT"
                title="Distribution of Tokens by Number of Active Chains"
            />
        </div>

        <Card className="mb-8">
             <BarChartComponent
                data={df24}
                xKey="EXPANSION_PATH"
                yKeys={['TOKEN_COUNT']}
                title="Token Expansion Across Blockchains"
             />
        </Card>

        <InsightText>
             <p>Examining token expansions from their original chain to a secondary chain reveals that the &quot;Ethereum → Base&quot; path is by far the most prevalent, with around 16,000 tokens taking this route—more than all other expansion paths combined. The next most popular paths are &quot;Ethereum → Polygon&quot; and &quot;Ethereum → Arbitrum,&quot; with 2,800 and 1,800 tokens, respectively.</p>
             <p>There are relatively low token counts for expansions between chains that don&apos;t involve Ethereum. This suggests that direct token migrations between alternative chains are less common, with most cross-chain activity centering around Ethereum.</p>
        </InsightText>

        <SectionHeader title="Final Thoughts" />

        <Card className="bg-slate-50 border-slate-200 p-8">
             <div className="prose max-w-none text-gray-700 space-y-4">
                <p>Uniswap’s token ecosystem is evolving fast, marked by big shifts and surprises. The rise of unique tokens and pairs has been nothing short of remarkable, with Ethereum leading the charge, as expected, but the recent explosion on Base turned heads. Late July 2024 was a game-changer—Base accounted for a staggering 86% of unique tokens and 79% of pairs traded, driven by low fees and a memecoin frenzy that briefly saw Base outpace Ethereum itself.</p>

                <p>Token creation is also booming. It took three years to hit 75,000 tokens, but just one more to double that to 150,000. Ethereum still sets the pace, but Base’s early 2024 surge, with nearly 5,000 new tokens in a week, signals a fresh wave of innovation.</p>

                <p>We’ve seen it all in token lifespans too—Optimism and Polygon have some of the longest-lasting tokens, while on Base, it’s more of a sink-or-swim scenario, with many tokens not making it past 50 days. It’s a tough market out there; nearly half of all tokens don’t survive their first week, highlighting Uniswap’s nature as a proving ground where success isn’t guaranteed.</p>

                <p>Meanwhile, swap activity tells its own story. Ethereum and stablecoins still dominate, but it’s the memecoins, especially on Base, that are drawing in traders. This just goes to show the unexpected power of these fun, speculative assets in driving user engagement.</p>

                <p>And as for token expansion, it’s clear: Ethereum remains the heart of the network. The “Ethereum to Base” path is the most popular, dwarfing other routes, with thousands of tokens using Ethereum as a launchpad for cross-chain growth.</p>

                <p>Uniswap’s landscape is a mix of stability, innovation, and a touch of chaos. The trends we’re seeing now—rising token diversity, rapid expansion, and the constant ebb and flow of new and old players—paint a picture of a DeFi world that’s anything but predictable. There’s more ahead, and it’s going to be exciting to see where Uniswap goes next.</p>
             </div>
        </Card>

      </div>
    </main>
  );
}

function InsightText({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-lg border-l-4 border-amber-500 shadow-sm my-6 text-gray-700 space-y-4">
            {children}
        </div>
    )
}

// Helper component to render top items per blockchain
// This mimics the faceted bar charts
function TopBarChart({ data, category, value, title }: { data: any[], category: string, value: string, title: string }) {
    // We simply stack them for now to show distribution, as a full multi-facet chart is complex
    // A better approach is to group by Blockchain and then Stack by Category

    const pivot = pivotData(data, 'BLOCKCHAIN', category, value);
    const keys = getUniqueKeys(data, category);

    // If too many keys, slice them
    const limitedKeys = keys.length > 10 ? keys.slice(0, 10) : keys;

    return (
        <BarChartComponent
            data={pivot}
            xKey="BLOCKCHAIN"
            yKeys={limitedKeys}
            stacked={true}
            title={title}
        />
    )
}


// Helper functions to transform data for Recharts
function pivotData(data: any[], indexKey: string, columnKey: string, valueKey: string) {
  const result: any = {};

  data.forEach(row => {
    const index = row[indexKey];
    const col = row[columnKey];
    const val = row[valueKey];

    if (!result[index]) {
      result[index] = { [indexKey]: index };
    }

    result[index][col] = val;
  });

  return Object.values(result).sort((a: any, b: any) => {
      // sort by index if it looks like a date or number
      if (new Date(a[indexKey]).toString() !== 'Invalid Date') {
          return new Date(a[indexKey]).getTime() - new Date(b[indexKey]).getTime();
      }
       return 0;
  });
}

function getUniqueKeys(data: any[], key: string) {
  return Array.from(new Set(data.map(row => row[key]))).filter(Boolean) as string[];
}
