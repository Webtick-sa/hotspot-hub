import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, Panel, StatCard } from "@/components/dashboard-ui";
import { fmtCurrency } from "@/lib/mock-data";
import { fetchAds } from "@/lib/api";
import { Megaphone, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_app/ads")({
  component: AdsPage,
});

function AdsPage() {
  const {
    data: ads,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ads"],
    queryFn: fetchAds,
    enabled: typeof window !== "undefined",
  });

  if (isLoading) {
    return <div className="p-6">Loading ads…</div>;
  }

  if (error || !ads) {
    return <div className="p-6 text-destructive">Unable to load ads.</div>;
  }

  const totalImpr = ads.reduce((s, a) => s + a.impressions, 0);
  const totalBudget = ads.reduce((s, a) => s + a.budget, 0);
  const totalActive = ads.filter((a) => a.active).length;
  const avgCpv = ads.length ? ads.reduce((s, a) => s + a.cpv_rate, 0) / ads.length : 0;

  return (
    <div>
      <PageHeader
        title="Ads"
        description="Manage active ad campaigns and portal creative from the advertisements collection."
        actions={
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> New campaign
          </Button>
        }
      />
      <div className="grid gap-4 p-6 md:grid-cols-4">
        <StatCard
          label="Active campaigns"
          value={totalActive.toLocaleString()}
          icon={<Megaphone className="h-5 w-5" />}
          accent="primary"
        />
        <StatCard
          label="Impressions"
          value={totalImpr.toLocaleString()}
          icon={<Eye className="h-5 w-5" />}
          accent="success"
        />
        <StatCard
          label="Avg CPV"
          value={`R ${avgCpv.toFixed(2)}`}
          accent="info"
        />
        <StatCard
          label="Budget"
          value={fmtCurrency(totalBudget)}
          accent="warning"
        />
      </div>
      <div className="px-6 pb-6">
        <Panel title="Campaigns">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Ad title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Target nodes</TableHead>
                <TableHead className="text-right">Impr.</TableHead>
                <TableHead className="text-right">Daily</TableHead>
                <TableHead className="text-right">Limit</TableHead>
                <TableHead className="w-40">Budget</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((a) => (
                <TableRow key={a.id} className="text-xs">
                  <TableCell className="font-medium">
                    <div>{a.campaign}</div>
                    <div className="text-muted-foreground text-[11px]">{a.campaign_start} → {a.campaign_end}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{a.ad_title}</TableCell>
                  <TableCell>
                    <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase">
                      {a.ad_type}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">
                    {a.target_nodes}
                  </TableCell>
                  <TableCell className="text-right font-mono">{a.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{a.daily_count.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{a.total_limit.toLocaleString()}</TableCell>
                  <TableCell>{fmtCurrency(a.budget)}</TableCell>
                  <TableCell>
                    <div className="whitespace-nowrap text-xs font-medium">
                      {a.active ? "Active" : "Inactive"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
      </div>
    </div>
  );
}
