import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { BiRightArrowAlt, BiSend } from "react-icons/bi";
import { motion, useAnimation } from "framer-motion";

import { OptionQuestion } from "../components/game/OptionQuestion";
import { Layout } from "../components/general/Layout";
import { trpc } from "../utils/trpc";

export default function Page() {
  // const [isShowingResults, setIsShowingResults] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  const controls = useAnimation();
  const router = useRouter();

  const { slug }: { slug: string } = router.query as any;

  const { data, isLoading, status } = trpc.question.getOne.useQuery({ slug }, { cacheTime: 0 });

  const mutation = trpc.question.vote.useMutation({
    onSuccess: () => {
      // router.push(data?.nextQuestion?.slug!, undefined, { shallow: true })
      // router.push(data?.nextQuestion?.slug!)
    },
    onMutate: (data) => {
      console.log({ data })
      setSelectedOption(data.option);
      // controls.start({
      //   x:  '-100%',
      //   opacity: 0,
      //   transition: { duration: 0.3 },
      // });
    },
  });

  useEffect(() => {
    controls.start({ x: 0, transition: { duration: 0.4 } });
  }, [isLoading, controls, status, data]);

  useEffect(() => {
    console.log("data", data);
    controls.start({ x: 0, transition: { duration: 0.4 } });
    setSelectedOption(null);
  }, [router]);

  const handleNextQuestion = () => {
    controls.start({
      x:  '-100%',
      opacity: 0,
      transition: { duration: 0.3 },
    });
  }

  const { question, nextQuestion } = data || {};

  return (
    <Layout>
      <>
        <Head>
          <title>{question?.question}</title>
        </Head>
        <div className="flex flex-col w-full lg:flex-row min-h-fit bg-slate-50">
          <div className="flex-1 py-6 mx-4 overflow-hidden h-[600px]">
            {/* <h1 className='text-4xl font-bold text-center'>{data?.question}</h1> */}
            {/* <AnimatePresence> */}
            <div className="flex flex-1 -z-40 h-[420px]">
              {data && (
                <motion.div className="w-full" initial={{ x: "100%" }} animate={controls} exit={{ x: "-100%" }} transition={{ duration: 0.5 }}>
                  <div className="px-6 pt-12 bg-white border rounded-xl option-question">
                    <h1 className="text-4xl font-bold text-center">¿Qué prefieres? 🤔</h1>

                    <div className="flex flex-row py-3 mt-12 space-x-6">
                      { [0, 1].map((i) => {
                        const option = i === 0 ? question?.option_a! : question?.option_b!
                        
                        const total = question?.option_a_votes! + question?.option_b_votes!
                        const percentageOptionA = Math.round((question?.option_a_votes! / total) * 100)
                        const percentageOptionB = Math.round((question?.option_b_votes! / total) * 100)
                        return (
                          <OptionQuestion
                            key={i}
                            option={option}
                            percentage={i === 0 ? percentageOptionA : percentageOptionB}
                            votes={i === 0 ? question?.option_a_votes! : question?.option_b_votes!}
                            primary={i === 0}
                            selectedOption={selectedOption}
                            onClick={() => {
                              if (selectedOption) return;
                              mutation.mutate({ id: question?.id!, option})
                            }}
                          />    
                        )
                      }) }
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* </AnimatePresence> */}
            { nextQuestion && (
              <div className="flex flex-row items-center justify-end my-4 bg-transparent">
                <Link href={nextQuestion?.slug}
                  onClick={handleNextQuestion}
                  className="flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-indigo-600 border-b-4 rounded-md shadow-lg border-b-indigo-900 hover:bg-indigo-700"
                >
                  <span>Siguiente</span>
                  <BiRightArrowAlt size={28} />
                </Link>
              </div>
            ) }
          </div>
          <div className="w-full lg:w-[450px] bg-white border-l p-6 flex flex-col z-10">
            <h2 className="pb-6 font-semibold">Comentarios</h2>

            <div className="w-full">
              <div className="flex flex-row items-center justify-between px-4 shadow-lg bg-slate-100 rounded-xl">
                <input placeholder="Comentar" className="w-full py-4 bg-transparent border-none " />
                <button className="p-3 text-white bg-indigo-500 rounded-xl">
                  <BiSend size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}
