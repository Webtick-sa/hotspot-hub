import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/dashboard-ui";
import { Wifi, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_app/portal")({
  component: PortalPage,
});

function PortalPage() {
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
                <Input defaultValue="MeshGrid Free WiFi" className="mt-1.5 font-mono" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Primary color
                </Label>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-9 w-9 rounded-md bg-primary" />
                  <Input defaultValue="#22D3EE" className="font-mono" />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Welcome message
                </Label>
                <Textarea
                  defaultValue="Welcome! Sign in or top up your wallet to get connected."
                  className="mt-1.5"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Terms URL
                </Label>
                <Input defaultValue="https://meshgrid.example/terms" className="mt-1.5 font-mono" />
              </div>
            </div>
          </Panel>

          <Panel title="Authentication methods">
            {[
              {
                k: "MAC auto-login",
                v: true,
                desc: "Skip portal if MAC has active wallet balance",
              },
              { k: "Voucher code", v: true, desc: "Accept prepaid voucher codes" },
              { k: "M-Pesa STK push", v: true, desc: "On-portal mobile money payment" },
              {
                k: "Watch ad to unlock",
                v: false,
                desc: "Free 5-minute pass after viewing video ad",
              },
              { k: "Social login", v: false, desc: "Sign in with Google / Facebook for free tier" },
            ].map((row) => (
              <div
                key={row.k}
                className="flex items-center justify-between border-b border-border/40 py-3 last:border-0"
              >
                <div>
                  <div className="text-sm font-medium">{row.k}</div>
                  <div className="text-xs text-muted-foreground">{row.desc}</div>
                </div>
                <Switch defaultChecked={row.v} />
              </div>
            ))}
          </Panel>

          <Panel title="MikroTik integration">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Hotspot host
                </Label>
                <Input defaultValue="hotspot.meshgrid.local" className="mt-1.5 font-mono" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  RADIUS shared secret
                </Label>
                <Input
                  type="password"
                  defaultValue="****************"
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
          <Button className="w-full">Publish portal changes</Button>
        </div>
      </div>
    </div>
  );
}
