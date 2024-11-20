import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SEOPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">SEO Management</h2>
        <Button>Generate Sitemap</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Global SEO Settings</CardTitle>
          <CardDescription>Manage your store's global SEO settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-title">Site Title</Label>
            <Input id="site-title" placeholder="Your Store Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea id="meta-description" placeholder="Enter your store's meta description" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input id="keywords" placeholder="Enter comma-separated keywords" />
          </div>
          <Button>Save Global SEO Settings</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Product SEO</CardTitle>
          <CardDescription>Manage SEO for individual products.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add a table or list of products with SEO fields here */}
          <p>Product SEO management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}