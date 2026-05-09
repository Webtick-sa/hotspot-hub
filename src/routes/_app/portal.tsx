import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard-ui";
import { Wifi, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";

export const Route = createFileRoute("/_app/portal")({
  component: PortalPage,
});

function PortalPage() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: () => fetch("/api/settings").then(r => r.json()).then(arr => arr[0]),
    enabled: typeof window !== "undefined",
  });

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      const { _id, ...dataToSend } = formData;
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['settings'] });
        toast.success('Portal settings saved');
      } else {
        toast.error('Failed to save portal settings');
      }
    } catch (error) {
      toast.error('Failed to save portal settings');
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'update') {
        queryClient.invalidateQueries({ queryKey: ['settings'] });
      }
    };
    return () => ws.close();
  }, [queryClient]);

  if (isLoading) return <div>Loading portal settings…</div>;
  return (
    <div>
      <PageHeader
        title="Captive Portal"
        description="Customize what users see when they connect to the WiFi."
      />
      <div className="grid gap-4 p-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <Panel title="Branding">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Network name
                </Label>
                <Input
                  value={formData.network_name || ""}
                  onChange={(e) => setFormData({ ...formData, network_name: e.target.value })}
                  className="mt-1.5 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Primary color
                </Label>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-9 w-9 rounded-md bg-primary" />
                  <Input
                    value={formData.primary_color || ""}
                    onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                    className="font-mono"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Welcome message
                </Label>
                <Textarea
                  value={formData.welcome_message || ""}
                  onChange={(e) => setFormData({ ...formData, welcome_message: e.target.value })}
                  className="mt-1.5"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Terms URL
                </Label>
                <Input
                  value={formData.terms_url || ""}
                  onChange={(e) => setFormData({ ...formData, terms_url: e.target.value })}
                  className="mt-1.5 font-mono"
                />
              </div>
            </div>
          </Panel>

          <Panel title="Authentication methods">
            {[
              {
                k: "mac_auto_login",
                label: "MAC auto-login",
                desc: "Skip portal if MAC has active wallet balance",
              },
              { k: "voucher_code", label: "Voucher code", desc: "Accept prepaid voucher codes" },
              { k: "mpesa_stk_push", label: "M-Pesa STK push", desc: "On-portal mobile money payment" },
              {
                k: "watch_ad_unlock",
                label: "Watch ad to unlock",
                desc: "Free 5-minute pass after viewing video ad",
              },
              { k: "social_login", label: "Social login", desc: "Sign in with Google / Facebook for free tier" },
            ].map((row) => (
              <div
                key={row.k}
                className="flex items-center justify-between border-b border-border/40 py-3 last:border-0"
              >
                <div>
                  <div className="text-sm font-medium">{row.label}</div>
                  <div className="text-xs text-muted-foreground">{row.desc}</div>
                </div>
                <Switch
                  checked={formData[row.k] || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, [row.k]: checked })}
                />
              </div>
            ))}
          </Panel>

          <Panel title="MikroTik integration">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Hotspot host
                </Label>
                <Input
                  value={formData.hotspot_host || ""}
                  onChange={(e) => setFormData({ ...formData, hotspot_host: e.target.value })}
                  className="mt-1.5 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  RADIUS shared secret
                </Label>
                <Input
                  type="password"
                  value={formData.radius_shared_secret || ""}
                  onChange={(e) => setFormData({ ...formData, radius_shared_secret: e.target.value })}
                  className="mt-1.5 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  API port
                </Label>
                <Input defaultValue="8728" className="mt-1.5 font-mono" />
              </div>
              <div className="flex items-end">
                <Button variant="outline" size="sm" className="w-full">
                  Test connection
                </Button>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <Panel title="Live preview">
            <div className="overflow-hidden rounded-lg border border-border bg-background">
              <div className="bg-card p-4">
                <div className="mx-auto max-w-xs space-y-3 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Wifi className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">MeshGrid Free WiFi</h3>
                  <p className="text-xs text-muted-foreground">
                    Welcome! Sign in or top up your wallet to get connected.
                  </p>
                  <div className="space-y-2 pt-2">
                    <Button size="sm" className="w-full">
                      Top up with M-Pesa
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      Enter voucher code
                    </Button>
                  </div>
                  <div className="rounded-md border border-dashed border-border p-3 text-left">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <ShoppingBag className="h-3 w-3" /> Sponsored
                    </div>
                    <p className="mt-1 text-xs">Naivas weekend deals — up to 30% off groceries.</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    MAC: A4:5E:60:xx:xx:01 · Balance: KES 12.00
                  </p>
                </div>
              </div>
            </div>
          </Panel>
          <Button onClick={handleSave} className="w-full">Publish portal changes</Button>
        </div>
      </div>
    </div>
  );
}
