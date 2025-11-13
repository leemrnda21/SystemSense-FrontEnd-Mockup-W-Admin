"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, Monitor, Server, Smartphone, Wifi } from "lucide-react"

interface HardwareComponent {
  id: string
  name: string
  category: string
  specifications: string
  purpose: string
  quantity: number
  justification: string
}

export default function HardwareComponentsTool() {
  const [components, setComponents] = useState<HardwareComponent[]>([
    {
      id: "1",
      name: "Interactive Kiosk Terminal",
      category: "Primary Interface",
      specifications:
        "21.5-inch touchscreen display, Intel Core i5 processor, 8GB RAM, 256GB SSD, Built-in camera, Card reader, Receipt printer, Biometric scanner",
      purpose: "Primary user interface for student financial registration, document submission, and payment processing",
      quantity: 5,
      justification:
        "Provides secure, user-friendly access points for students and parents to interact with the blockchain-AI system across multiple campus locations",
    },
    {
      id: "2",
      name: "Blockchain Network Nodes",
      category: "Infrastructure",
      specifications:
        "High-performance servers with multi-core processors, 32GB RAM, 1TB NVMe SSD, Redundant network connections",
      purpose: "Maintain distributed ledger, process smart contracts, and ensure system decentralization",
      quantity: 3,
      justification:
        "Minimum nodes required for network consensus and fault tolerance in the blockchain infrastructure",
    },
    {
      id: "3",
      name: "AI Processing Server",
      category: "Computing",
      specifications:
        "GPU-accelerated server with NVIDIA RTX 4090, 64GB RAM, Intel Xeon processor, High-speed storage array",
      purpose: "Execute AI algorithms for document verification, fraud detection, and pattern analysis",
      quantity: 1,
      justification:
        "Dedicated processing power required for real-time AI computations and machine learning operations",
    },
  ])

  const [newComponent, setNewComponent] = useState<Partial<HardwareComponent>>({
    name: "",
    category: "",
    specifications: "",
    purpose: "",
    quantity: 1,
    justification: "",
  })

  const addComponent = () => {
    if (newComponent.name && newComponent.category) {
      setComponents([
        ...components,
        {
          ...(newComponent as HardwareComponent),
          id: Date.now().toString(),
        },
      ])
      setNewComponent({
        name: "",
        category: "",
        specifications: "",
        purpose: "",
        quantity: 1,
        justification: "",
      })
    }
  }

  const generateDocumentation = () => {
    const doc = `
HARDWARE COMPONENTS

The implementation of the blockchain-AI integrated financial registration system requires specific hardware infrastructure to ensure optimal performance, security, and user accessibility. The hardware components are categorized into primary interface devices, computing infrastructure, and supporting equipment.

${components
  .map(
    (comp) => `
${comp.name.toUpperCase()}
Category: ${comp.category}
Quantity: ${comp.quantity} unit(s)

Technical Specifications:
${comp.specifications}

Purpose and Functionality:
${comp.purpose}

Justification:
${comp.justification}
`,
  )
  .join("\n")}

SYSTEM ARCHITECTURE OVERVIEW

The hardware infrastructure supports a three-tier architecture:
1. Presentation Layer: Interactive kiosks and user interface devices
2. Processing Layer: AI servers and blockchain nodes
3. Data Layer: Distributed storage and backup systems

DEPLOYMENT STRATEGY

The hardware components will be strategically deployed across the testing environment to ensure comprehensive coverage and optimal system performance. Primary kiosk terminals will be positioned in high-traffic areas including the registrar's office, finance department, and main campus entrances to maximize accessibility for students and parents.
    `.trim()

    const blob = new Blob([doc], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "hardware-components-documentation.txt"
    a.click()
  }

  const categories = ["Primary Interface", "Infrastructure", "Computing", "Security", "Networking", "Storage"]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Hardware Components Documentation Tool</h1>
        <p className="text-muted-foreground">
          Document and organize hardware requirements for your blockchain-AI research system
        </p>
      </div>

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="components">Components List</TabsTrigger>
          <TabsTrigger value="add">Add Component</TabsTrigger>
          <TabsTrigger value="documentation">Generate Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="space-y-4">
          <div className="grid gap-4">
            {components.map((component) => (
              <Card key={component.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {component.category === "Primary Interface" && <Monitor className="h-5 w-5" />}
                      {component.category === "Infrastructure" && <Server className="h-5 w-5" />}
                      {component.category === "Computing" && <Smartphone className="h-5 w-5" />}
                      {component.category === "Networking" && <Wifi className="h-5 w-5" />}
                      {component.name}
                    </CardTitle>
                    <Badge variant="secondary">{component.category}</Badge>
                  </div>
                  <CardDescription>Quantity: {component.quantity} unit(s)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">Technical Specifications:</h4>
                    <p className="text-sm text-muted-foreground">{component.specifications}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Purpose:</h4>
                    <p className="text-sm text-muted-foreground">{component.purpose}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Justification:</h4>
                    <p className="text-sm text-muted-foreground">{component.justification}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Hardware Component</CardTitle>
              <CardDescription>Add additional hardware components to your research documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Component Name</Label>
                  <Input
                    id="name"
                    value={newComponent.name || ""}
                    onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                    placeholder="e.g., Biometric Scanner"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newComponent.category || ""}
                    onChange={(e) => setNewComponent({ ...newComponent, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specifications">Technical Specifications</Label>
                <Textarea
                  id="specifications"
                  value={newComponent.specifications || ""}
                  onChange={(e) => setNewComponent({ ...newComponent, specifications: e.target.value })}
                  placeholder="Detailed technical specifications..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose and Functionality</Label>
                <Textarea
                  id="purpose"
                  value={newComponent.purpose || ""}
                  onChange={(e) => setNewComponent({ ...newComponent, purpose: e.target.value })}
                  placeholder="What this component does in your system..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newComponent.quantity || 1}
                  onChange={(e) => setNewComponent({ ...newComponent, quantity: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="justification">Justification</Label>
                <Textarea
                  id="justification"
                  value={newComponent.justification || ""}
                  onChange={(e) => setNewComponent({ ...newComponent, justification: e.target.value })}
                  placeholder="Why this component is necessary for your research..."
                  rows={3}
                />
              </div>

              <Button onClick={addComponent} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Research Documentation</CardTitle>
              <CardDescription>Export your hardware components documentation in academic format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Documentation Preview:</h3>
                  <p className="text-sm text-muted-foreground">
                    Your documentation will include {components.length} hardware components with detailed
                    specifications, purposes, and justifications formatted for academic research.
                  </p>
                </div>
                <Button onClick={generateDocumentation} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Hardware Components Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
