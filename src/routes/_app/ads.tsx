import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusDot, StatCard } from "@/components/dashboard-ui";
import { ads, fmtCurrency } from "@/lib/mock-data";
import { Megaphone, MousePointerClick, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/ads")({
  component: AdsPage,
});

function AdsPage() {
  const totalImpr = ads.reduce((s, a) => s + a.impressions, 0);
  const totalClicks = ads.reduce((s, a) => s + a.clicks, 0);
  const revenue = ads.reduce((s, a) => s + a.spent, 0);
  return (
    <div>
      <PageHeader
        title="Ads"
        description="Run banners, videos and interstitials on the captive portal."
        actions={<Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" /> New campaign</Button>}
      />
      <div className="grid gap-4 p-6 md:grid-cols-4">
        <StatCard label="Impressions" value={totalImpr.toLocaleString()} icon={<Eye className="h-5 w-5" />} accent="primary" />
        <StatCard label="Clicks" value={totalClicks.toLocaleString()} icon={<MousePointerClick className="h-5 w-5" />} accent="success" />
        <StatCard label="Avg CTR" value={`${(totalClicks / totalImpr * 100).toFixed(2)}%`} accent="info" />
        <StatCard label="Ad revenue" value={fmtCurrency(revenue)} icon={<Megaphone className="h-5 w-5" />} accent="warning" />
      </div>
      <div className="px-6 pb-6">
        <Panel title="Campaigns">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Advertiser</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Placement</TableHead>
                <TableHead className="text-right">Impr.</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="w-40">Budget</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((a) => (
                <TableRow key={a.id} className="text-xs">
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell className="text-muted-foreground">{a.advertiser}</TableCell>
                  <TableCell><span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase">{a.type}</span></TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{a.placement}</TableCell>
                  <TableCell className="text-right font-mono">{a.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{a.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono text-success">{a.ctr.toFixed(2)}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(a.spent / a.budget) * 100} className="h-1.5" />
                      <span className="font-mono text-[10px] text-muted-foreground">{Math.round((a.spent / a.budget) * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell><StatusDot status={a.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
      </div>
    </div>
  );
}
