"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Settings, Save, Bell, Shield, Printer, Scale, Database } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sound: true,
  })
  const [scaleSettings, setScaleSettings] = useState({
    scaleNumber: "1",
    unit: "kg",
    precision: "0",
    autoCapture: false,
  })
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully",
    })
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">Manage your application settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>Configure notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email alerts for important events</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-notifications">Sound Alerts</Label>
                  <p className="text-sm text-muted-foreground">Play sound for transaction completions</p>
                </div>
                <Switch
                  id="sound-notifications"
                  checked={notifications.sound}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sound: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                Scale Settings
              </CardTitle>
              <CardDescription>Configure scale connection and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scale-number">Scale Number</Label>
                <Select value={scaleSettings.scaleNumber} onValueChange={(value) => setScaleSettings({ ...scaleSettings, scaleNumber: value })}>
                  <SelectTrigger id="scale-number">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Scale 1</SelectItem>
                    <SelectItem value="2">Scale 2</SelectItem>
                    <SelectItem value="3">Scale 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Weight Unit</Label>
                <Select value={scaleSettings.unit} onValueChange={(value) => setScaleSettings({ ...scaleSettings, unit: value })}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="precision">Decimal Precision</Label>
                <Select value={scaleSettings.precision} onValueChange={(value) => setScaleSettings({ ...scaleSettings, precision: value })}>
                  <SelectTrigger id="precision">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 decimals</SelectItem>
                    <SelectItem value="1">1 decimal</SelectItem>
                    <SelectItem value="2">2 decimals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-capture">Auto Capture</Label>
                  <p className="text-sm text-muted-foreground">Automatically capture weight when stable</p>
                </div>
                <Switch
                  id="auto-capture"
                  checked={scaleSettings.autoCapture}
                  onCheckedChange={(checked) => setScaleSettings({ ...scaleSettings, autoCapture: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-primary" />
                Printer Settings
              </CardTitle>
              <CardDescription>Configure ticket printing options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="printer-name">Printer Name</Label>
                <Input id="printer-name" placeholder="Select printer..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paper-size">Paper Size</Label>
                <Select>
                  <SelectTrigger id="paper-size">
                    <SelectValue placeholder="Select paper size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="receipt">Receipt (80mm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-print">Auto Print</Label>
                  <p className="text-sm text-muted-foreground">Automatically print tickets after transaction</p>
                </div>
                <Switch id="auto-print" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security
              </CardTitle>
              <CardDescription>Manage security and access settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-password">Require Password for Edits</Label>
                  <p className="text-sm text-muted-foreground">Require password confirmation for sensitive operations</p>
                </div>
                <Switch id="require-password" defaultChecked />
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              System Information
            </CardTitle>
            <CardDescription>Application version and system details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Application Version</p>
                <p className="font-medium mt-1">v1.0.0</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p className="font-medium mt-1">2024-02-05</p>
              </div>
              <div>
                <p className="text-muted-foreground">Database Status</p>
                <p className="font-medium mt-1 text-primary">Connected</p>
              </div>
              <div>
                <p className="text-muted-foreground">Scale Connection</p>
                <p className="font-medium mt-1 text-primary">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
