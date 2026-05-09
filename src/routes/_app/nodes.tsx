import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, Panel, StatusDot } from "@/components/dashboard-ui";
import { fetchNodes } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw, Power, Settings2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_app/nodes")({
  component: NodesPage,
});

function NodesPage() {
  const {
    data: nodes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["nodes"],
    queryFn: fetchNodes,
    enabled: typeof window !== "undefined",
  });

  if (isLoading) {
    return <div className="p-6">Loading nodes…</div>;
  }

  if (error || !nodes) {
    return <div className="p-6 text-destructive">Unable to load nodes.</div>;
  }

  const aps = nodes.filter((n) => n.type === "AP");
  return (
    <div>
      <PageHeader
        title="Access Points"
        description="MikroTik hotspot nodes serving captive portals."
        actions={
          <>
            <Input placeholder="Filter…" className="h-9 w-48 bg-card/60 font-mono text-xs" />
            <Button size="sm" variant="outline">
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Sync
            </Button>
            <Button size="sm">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Provision AP
            </Button>
          </>
        }
      />
      <div className="p-6">
        <Panel>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Node</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>IP / MAC</TableHead>
                <TableHead className="text-right">Clients</TableHead>
                <TableHead className="text-right">Throughput</TableHead>
                <TableHead className="text-right">Signal</TableHead>
                <TableHead className="text-right">CPU / RAM</TableHead>
                <TableHead>Firmware</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aps.map((n) => (
                <TableRow key={n.id} className="font-mono text-xs">
                  <TableCell className="font-semibold text-foreground">{n.name}</TableCell>
                  <TableCell className="text-muted-foreground">{n.location}</TableCell>
                  <TableCell>
                    <div>{n.ip}</div>
                    <div className="text-[10px] text-muted-foreground">{n.mac}</div>
                  </TableCell>
                  <TableCell className="text-right">{n.clients}</TableCell>
                  <TableCell className="text-right">{n.throughputMbps} Mbps</TableCell>
                  <TableCell className="text-right">{n.signal} dBm</TableCell>
                  <TableCell className="text-right">
                    {n.cpu}% / {n.memory}%
                  </TableCell>
                  <TableCell>{n.firmware}</TableCell>
                  <TableCell>
                    <StatusDot status={n.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <Settings2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <Power className="h-3.5 w-3.5" />
                      </Button>
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
