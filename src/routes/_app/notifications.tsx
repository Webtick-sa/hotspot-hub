import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, Panel } from "@/components/dashboard-ui";
import { fetchNotifications } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Bell } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    enabled: typeof window !== "undefined",
  });

  if (isLoading) {
    return <div className="p-6">Loading notifications…</div>;
  }

  if (error || !notifications) {
    return <div className="p-6 text-destructive">Unable to load notifications.</div>;
  }

  return (
    <div>
      <PageHeader title="Notifications" description="Push messages to portal users in real time." />
      <div className="grid gap-4 p-6 lg:grid-cols-5">
        <Panel title="Compose broadcast">
          <div className="lg:col-span-2 space-y-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Title
              </Label>
              <Input className="mt-1.5" placeholder="e.g. New plan available" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Message
              </Label>
              <Textarea
                className="mt-1.5"
                rows={4}
                placeholder="Tell users about a promotion, outage or new feature…"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Audience
                </Label>
                <Select defaultValue="all">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All users</SelectItem>
                    <SelectItem value="active">Currently active</SelectItem>
                    <SelectItem value="low">Low balance (&lt; 10)</SelectItem>
                    <SelectItem value="node">By node</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Channel
                </Label>
                <Select defaultValue="portal">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portal">Captive portal banner</SelectItem>
                    <SelectItem value="push">Browser push</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => toast.success("Broadcast queued · 1,240 recipients")}
            >
              <Send className="mr-1.5 h-3.5 w-3.5" /> Send broadcast
            </Button>
          </div>
        </Panel>

        <div className="lg:col-span-3">
          <Panel title="Recent broadcasts">
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="rounded-md border border-border/50 bg-background/30 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <Bell className="mt-0.5 h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium">{n.title}</div>
                        <div className="text-xs text-muted-foreground">{n.body}</div>
                      </div>
                    </div>
                    <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase">
                      {n.channel}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
                    <span>{n.sentAt}</span>
                    <span>
                      · delivered{" "}
                      <span className="text-foreground">{n.delivered.toLocaleString()}</span>
                    </span>
                    <span>
                      · opened <span className="text-success">{n.opened.toLocaleString()}</span> (
                      {Math.round((n.opened / n.delivered) * 100)}%)
                    </span>
                    <span>· audience {n.audience}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
