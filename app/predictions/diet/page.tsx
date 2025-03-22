"use client"

import { useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  Apple,
  Dumbbell,
  Heart,
  Info,
  Ruler,
  Scale,
  User,
  CheckCircle,
} from "lucide-react"
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
  FormDescription,
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"

// Form schema with validation
const formSchema = z.object({
  age: z.coerce
    .number({
      required_error: "Please enter your age.",
      invalid_type_error: "Age must be a number.",
    })
    .min(18, { message: "Age must be at least 18 years." })
    .max(100, { message: "Age must be less than 100 years." }),
  sex: z.enum(["Male", "Female"], {
    required_error: "Please select your sex.",
  }),
  height: z.coerce
    .number({
      required_error: "Please enter your height.",
      invalid_type_error: "Height must be a number.",
    })
    .min(1.0, { message: "Height must be at least 1.0 meters." })
    .max(2.5, { message: "Height must be less than 2.5 meters." }),
  weight: z.coerce
    .number({
      required_error: "Please enter your weight.",
      invalid_type_error: "Weight must be a number.",
    })
    .min(30, { message: "Weight must be at least 30 kg." })
    .max(250, { message: "Weight must be less than 250 kg." }),
  hypertension: z.enum(["Yes", "No"], {
    required_error: "Please select if you have hypertension.",
  }),
  diabetes: z.enum(["Yes", "No"], {
    required_error: "Please select if you have diabetes.",
  }),
  fitness_goal: z.enum(["Weight Loss", "Weight Gain"], {
    required_error: "Please select your fitness goal.",
  }),
  fitness_type: z.enum(["Cardio Fitness", "Muscular Fitness"], {
    required_error: "Please select your preferred fitness type.",
  }),
})

type FormValues = z.infer<typeof formSchema>

type RecommendationResponse = {
  recommendation: {
    diet: string
    exercise: string
  }
  bmi: number
  bmi_category: string
  height_used: {
    cm: number
    m: number
  }
}

export default function FitnessRecommendationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] =
    useState<RecommendationResponse | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const { toast } = useToast()
  const { theme } = useTheme()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      sex: undefined,
      height: undefined,
      weight: undefined,
      hypertension: undefined,
      diabetes: undefined,
      fitness_goal: undefined,
      fitness_type: undefined,
    },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    setRecommendation(null)

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "http://localhost:8001/api/predict_plan",
        data
      )

      console.log(response.data)

      // Show success animation
      setRecommendation(response.data)
      setShowConfetti(true)

      toast({
        title: "Recommendation Ready!",
        description: "Your personalized fitness plan has been generated.",
        variant: "default",
      })

      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    } catch (error) {
      console.error("Error generating recommendation:", error)
      toast({
        title: "Recommendation Failed",
        description:
          "There was an error generating your fitness plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Function to parse and format diet items
  const parseDietItems = (dietText: string) => {
    // Extract categories and items using regex
    const categories = dietText.split(";")
    console.log(categories)
    return categories.map((category) => {
      const [name, itemsStr] = category.split(": (")
      const items = itemsStr.replace(")", "").split(", ")
      return { name, items }
    })
  }

  // Function to parse and format exercise items
  const parseExerciseItems = (exerciseText: string) => {
    return exerciseText.split(", ").map((item) => item.trim())
  }

  // Get BMI color based on category
  const getBmiColor = (category: string) => {
    switch (category) {
      case "Underweight":
        return "text-blue-500"
      case "Normal weight":
        return "text-green-500"
      case "Overweight":
        return "text-yellow-500"
      case "Obese":
        return "text-red-500"
      default:
        return "text-primary"
    }
  }

  return (
    <div className="container max-w-4xl py-10 mx-auto">
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
              <Activity className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">
                Personalized Fitness Recommendation
              </CardTitle>
            </div>
            <CardDescription>
              Enter your details to receive a customized fitness and diet plan.
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
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          Age (years)
                        </FormLabel>
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
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          Sex
                        </FormLabel>
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
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-muted-foreground" />
                          Height (meters)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Enter your height"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Example: 1.75 for 175 cm
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Scale className="h-4 w-4 text-muted-foreground" />
                          Weight (kg)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your weight"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hypertension"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-muted-foreground" />
                          Hypertension
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Do you have hypertension?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="diabetes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-muted-foreground" />
                          Diabetes
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Do you have diabetes?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fitness_goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          Fitness Goal
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your fitness goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Weight Loss">
                              Weight Loss
                            </SelectItem>
                            <SelectItem value="Weight Gain">
                              Weight Gain
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fitness_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Dumbbell className="h-4 w-4 text-muted-foreground" />
                          Fitness Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your preferred fitness type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Cardio Fitness">
                              Cardio Fitness
                            </SelectItem>
                            <SelectItem value="Muscular Fitness">
                              Muscular Fitness
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <span>Generating Recommendations...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Get My Personalized Plan</span>
                      <Activity className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            <AnimatePresence>
              {recommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6 text-center"
                  >
                    <h3 className="text-xl font-semibold">
                      Your Personalized Fitness Plan
                    </h3>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-2xl"
                      >
                        BMI: {recommendation.bmi.toFixed(1)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${getBmiColor(
                          recommendation.bmi_category
                        )} bg-primary/5 text-2xl`}
                      >
                        {recommendation.bmi_category}
                      </Badge>
                    </div>
                  </motion.div>

                  <Tabs defaultValue="diet" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="diet"
                        className="flex items-center gap-2"
                      >
                        <Apple className="h-4 w-4" />
                        Diet Plan
                      </TabsTrigger>
                      <TabsTrigger
                        value="exercise"
                        className="flex items-center gap-2"
                      >
                        <Dumbbell className="h-4 w-4" />
                        Exercise Plan
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="diet" className="mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            Recommended Diet
                          </CardTitle>
                          <CardDescription>
                            Personalized nutrition plan based on your profile
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {parseDietItems(
                              recommendation.recommendation.diet
                            ).map((category, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="border rounded-lg p-4"
                              >
                                <h4 className="font-medium text-primary mb-2">
                                  {category.name}
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {category.items.map((item, itemIndex) => (
                                    <motion.li
                                      key={itemIndex}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{
                                        delay: 0.4 + itemIndex * 0.05,
                                      }}
                                      className="flex items-center gap-2"
                                    >
                                      <span className="h-2 w-2 rounded-full bg-primary/60"></span>
                                      {item}
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="exercise" className="mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            Recommended Exercises
                          </CardTitle>
                          <CardDescription>
                            Personalized workout plan based on your fitness
                            goals
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {parseExerciseItems(
                              recommendation.recommendation.exercise
                            ).map((exercise, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="bg-primary/5 rounded-lg p-4 flex items-center gap-3"
                              >
                                <div className="bg-primary/10 p-2 rounded-full">
                                  <Dumbbell className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-medium">{exercise}</span>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="bg-muted/50 flex justify-between text-xs text-muted-foreground">
            <p>Recommendations are personalized based on your profile</p>
            <p>© {new Date().getFullYear()} Fitness Planner</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
