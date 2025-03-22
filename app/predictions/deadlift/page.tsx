"use client"

import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Dumbbell, CheckCircle, ArrowRight } from "lucide-react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import CountUp from "react-countup"

// Form schema with validation
const formSchema = z.object({
  Sex: z.enum(["M", "F"], {
    required_error: "Please select your sex.",
  }),
  Equipment: z.enum(["Raw", "Wraps", "Single-ply", "Multiple-ply"], {
    required_error: "Please select equipment type.",
  }),
  Age: z.coerce
    .number({
      required_error: "Please enter your age.",
      invalid_type_error: "Age must be a number.",
    })
    .min(14, { message: "Age must be at least 14 years." })
    .max(100, { message: "Age must be less than 100 years." }),
  BodyweightKg: z.coerce
    .number({
      required_error: "Please enter your bodyweight.",
      invalid_type_error: "Bodyweight must be a number.",
    })
    .min(30, { message: "Bodyweight must be at least 30kg." })
    .max(250, { message: "Bodyweight must be less than 250kg." }),
  BestSquatKg: z.coerce
    .number({
      required_error: "Please enter your best squat.",
      invalid_type_error: "Best squat must be a number.",
    })
    .min(0, { message: "Best squat must be at least 0kg." })
    .max(500, { message: "Best squat must be less than 500kg." }),
  Bestbenchkg: z.coerce
    .number({
      required_error: "Please enter your best bench press.",
      invalid_type_error: "Best bench press must be a number.",
    })
    .min(0, { message: "Best bench press must be at least 0kg." })
    .max(350, { message: "Best bench press must be less than 350kg." }),
})

type FormValues = z.infer<typeof formSchema>

export default function DeadliftPredictorPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [predictedMax, setPredictedMax] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Sex: undefined,
      Equipment: undefined,
      Age: undefined,
      BodyweightKg: undefined,
      BestSquatKg: undefined,
      Bestbenchkg: undefined,
    },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    setPredictedMax(null)

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/predict_lift",
        data
      )

      // Show success animation
      setPredictedMax(response.data.predicted_deadlift_max)
      setShowConfetti(true)

      toast({
        title: "Prediction Complete!",
        description: "Your estimated deadlift max has been calculated.",
        variant: "default",
      })

      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    } catch (error) {
      console.error("Error predicting deadlift max:", error)
      toast({
        title: "Prediction Failed",
        description:
          "There was an error calculating your deadlift max. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-3xl mx-auto py-10">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Deadlift Max Predictor</CardTitle>
            </div>
            <CardDescription>
              Enter your lifting stats to predict your maximum deadlift
              potential.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="Sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sex</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your sex" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="M">Male</SelectItem>
                            <SelectItem value="F">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Equipment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipment</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select equipment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Raw">Raw</SelectItem>
                            <SelectItem value="Wraps">Wraps</SelectItem>
                            <SelectItem value="Single-ply">
                              Single-ply
                            </SelectItem>
                            <SelectItem value="Multiple-ply">
                              Multiple-ply
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (years)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your age"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="BodyweightKg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bodyweight (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your bodyweight"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="BestSquatKg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Squat (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your best squat"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Bestbenchkg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Bench Press (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your best bench press"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <span>Calculating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Predict My Deadlift Max</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            {predictedMax !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-primary/10 rounded-lg text-center"
              >
                <div className="flex justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Your Predicted Deadlift Max
                </h3>
                <div className="text-4xl font-bold text-primary">
                  <CountUp
                    end={predictedMax}
                    duration={2.5}
                    separator=","
                    suffix=" kg"
                  />
                </div>
                <p className="mt-4 text-muted-foreground">
                  This is an estimate based on your current stats. With proper
                  training and technique, you can achieve this goal!
                </p>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="bg-muted/50 flex justify-between text-xs text-muted-foreground">
            <p>Results are estimates based on statistical models</p>
            <p>© {new Date().getFullYear()} Fitness Predictor</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
