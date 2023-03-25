const {Quiz, QuizQuestion, QuestionM2MOption, QuizOption, QuizGroup} = require("./modules/assessment/models");
const {dbClient} = require("./config");
const {User,Reports} = require("./modules/auth/models");


const COMMON_DATA = {
    created_at: new Date(),
    updated_at: new Date(),
}

const QUIZZES = [
    {
        title: "Phishing and Email Security",
        title_jp: "フィッシングと電子メール セキュリティ",
        time_to_complete_in_minutes: 30,
        status: "active",
    },
    {
        title: "The Beginners Cyber Security Quiz",
        title_jp: "初心者向けサイバー セキュリティ クイズ",
        time_to_complete_in_minutes: 30,
        status: "active",
    },
]

const QUIZ_GROUPS = [
    {
        title: "General Security",
        title_jp: "一般的なセキュリティ",
        quiz_id: 1
    },
    {
        title: "Phishing and Email Security",
        title_jp: "フィッシングと電子メール セキュリティ",
        quiz_id: 2
    },
]

const QUIZ_OPTIONS = {
    1: {
        "title": "You Need To Contact Your It Help Desk Or Information Security Team.",
        "title_jp": "IT ヘルプ デスクまたは情報セキュリティ チームに連絡する必要がある。"
    },
    2: {
        "title": "Do Not Use The Usb Stick. Request The Supplier To The Send The File Via Email Or Upload It To A Secure File Sharing Service.",
        "title_jp": "USB スティックは使わない。 ファイルは電子メールで送信するか、安全なファイル共有サービスにアップロードするようサプライヤに依頼する。"
    },
    3: {
        "title": "Insert The Usb Memory Stick But Don't Click On Any Of The Files.",
        "title_jp": "USB メモリ スティックを挿入しますが、どのファイルもクリックしない。"
    },
    4: {
        "title": "Once A Week.",
        "title_jp": "週に一度"
    },
    5: {
        "title": "Once A Month.",
        "title_jp": "-月に一度。"
    },
    6: {
        "title": "Unplug The Computer.",
        "title_jp": "コンピュータをネットワークから遮断する。"
    },
    7: {
        "title": "The App Might Corrupt All The Data On His Phone Which He Uses For Work.",
        "title_jp": "このアプリは、彼が仕事で使用している電話のすべてのデータを破損する可能性がある。"
    },

    8: {
        "title": "Back Up Your Data.",
        "title_jp": "データをバックアップする"
    },
    9: {
        "title": "Share Your Password With One Friend So That They Monitor Any Unusual Activity.",
        "title_jp": "パスワードを 1 人の友人と共有して、異常なアクティビティを監視できるようにする。"
    },
    10: {
        "title": "Scams Through Emails.",
        "title_jp": "メールによる詐欺"
    },
    11: {
        "title": "Go To A Computer Terminal And Log The User In So They Can Meet Their Deadline.",
        "title_jp": "コンピュータ端末に移動し、ユーザーをログインさせて、締め切りに間に合うようにする。"
    },
    12: {
        "title": "Computer Savvy People Who Hack Individuals And Businesses As A Form Of Competition.",
        "title_jp": "コンピュータに精通した人々が競争の一形態として個人や企業をハッキングする。"
    },
    13: {
        "title": "Only Use Secure Internet Connections.",
        "title_jp": "安全なインターネット接続のみを使用する"
    },
    14: {
        "title": "Allow All Permissions On The App So That It Performs At The Highest Level.",
        "title_jp": "アプリが最高レベルで実行されるように、アプリのすべての権限を許可"
    },
    15: {
        "title": "Get The Agent'S Email Address And Email Him Your Login And Password.",
        "title_jp": "エージェントの電子メール アドレスを取得し、ログインIDとパスワードを電子メールで送信する。"
    },
    16: {
        "title": "Change The Password And Enable Two-Factor Authentication On The Email Account.",
        "title_jp": "パスワードを変更し、その電子メール アカウントで 2 要素認証を有効にする。"
    },
    17: {
        "title": "Change The Password, Then Run An Anti-Virus Scan An Anti-Malware Scan.",
        "title_jp": "パスワードを変更してから、ウイルス対策スキャンとマルウェア対策スキャンを実行する。"
    },
    18: {
        "title": "You Need To Update And Run Your Anti-Virus Software.",
        "title_jp": "ウイルス対策ソフトウェアを更新して実行する必要がある。"
    },
    19: {
        "title": "Put Your Login Credentials On An Encrypted Usb Memory Stick And Hand It To Them.",
        "title_jp": "ログイン認証情報を暗号化された USB メモリ スティックに入れて、彼らに渡す。"
    },
    20: {
        "title": "Phishing Happens Exclusively Over Email.",
        "title_jp": "フィッシングは電子メールのみを介して発生します。"
    },
    21: {
        "title": "Click On The Link Anyway And See Where It Takes You.",
        "title_jp": "とにかくリンクをクリックして、どこに移動するかを確認する。"
    },
    22: {
        "title": "I<3Le@Rningcybersec!!.",
        "title_jp": "I<3Le@Rningcybersec!!."
    },
    23: {
        "title": "The App Might Contain Viruses.",
        "title_jp": "アプリにウイルスが含まれている可能性がある。"
    },
    24: {
        "title": "The App Might Give Him Fraudulent Information And He Might End-Up Be Redirected To A Fraudulent Site.",
        "title_jp": "アプリから不正な情報が提供され、不正なサイトにリダイレクトされる可能性がある。"
    },
    25: {
        "title": "To Protect Your Identity And Sensitive Information.",
        "title_jp": "あなた自身の身元とセンシティブな情報を保護するため。"
    },
    26: {
        "title": "Implement Multifactor Authentication On Your Account.",
        "title_jp": "アカウントに多要素認証を実装する"
    },
    27: {
        "title": "The Purpose Of A Firewall And Security Software Is To Block Malicious Code Getting Into Your Computer In The First Place So No Action Is Needed.",
        "title_jp": "ファイアウォールやセキュリティソフトの目的は、悪意のあるコードがコンピュータに侵入するのを最初からブロックすることなので、何もする必要はない。"
    },
    28: {
        "title": "The Link Is From A Known Person Therefore It'S Safe To Open.",
        "title_jp": "知っている人からのリンクであるため、開いても安全だと考える。"
    },
    29: {
        "title": "Roppongi@123.",
        "title_jp": "Roppongi@123."
    },
    30: {
        "title": "Scams Through Websites.",
        "title_jp": "-ウェブサイトを介した詐欺"
    },
    31: {
        "title": "In A Password-Protected Word File Stored Inside Your Laptop.",
        "title_jp": "ラップトップ内に保存されているパスワードで保護された Word ファイル。"
    },
    32: {
        "title": "None Of The Above.",
        "title_jp": "上記のどれでもない"
    },
    33: {
        "title": "Winter2023.",
        "title_jp": "Winter2023."
    },
    34: {
        "title": "Scams Through Text Messages.",
        "title_jp": "-テキストメッセージによる詐欺"
    },
    35: {
        "title": "False.",
        "title_jp": "-間違い"
    },
    36: {
        "title": "If The Link Was Malicious The Organisation'S Firewall Would Have Flagged Or Blocked It, Therefore It'S Safe To Open.",
        "title_jp": "もし悪意のリンクであれば、組織のファイアウォールがフラグを立てたりブロックしたりするため、開いても安全だと考える。"
    },
    37: {
        "title": "Scams Through Phone Calls.",
        "title_jp": "電話による詐欺"
    },
    38: {
        "title": "Refuse And Contact Your Manager Or Information Security Team.",
        "title_jp": "拒否し、マネージャーまたは情報セキュリティ チームに連絡する。"
    },
    39: {
        "title": "Give The Support Representative Your Password, But Not Your Login.",
        "title_jp": "サポート担当者にパスワードを伝えますが、ログインIDは伝えない。"
    },
    40: {
        "title": "Your Password Should Have A Combination Of Uppercase, Lowercase, Numbers, And Special Characters.",
        "title_jp": "パスワードには、大文字、小文字、数字、および記号を組み合わせる必要があります"
    },
    41: {
        "title": "Change Any Compromised Passwords.",
        "title_jp": "侵害されたパスワードを変更する。"
    },
    42: {
        "title": "Your Password Should Be At Least 8 Characters Long.",
        "title_jp": "パスワードは 8 文字以上にする必要があります"
    },
    43: {
        "title": "Once A Fortnight.",
        "title_jp": "2週間に1回。"
    },
    44: {
        "title": "Delete The Phishing Email.",
        "title_jp": "フィッシングのメールを削除する。"
    },
    45: {
        "title": "Get The Agent'S Name And Give Him Your Login And Password.",
        "title_jp": "エージェントの名前を取得し、ログインIDとパスワードを彼に伝える。"
    },
    46: {
        "title": "Implement Multifactor Authentication To Your Accounts.",
        "title_jp": "-アカウントに多要素認証を実装する"
    },
    47: {
        "title": "Forward The Phishing Email To A Friend Or Colleague To Ask Them If They Can Check The Link Out First.",
        "title_jp": "フィッシング メールを友人や同僚に転送して、最初に彼らにリンクを試してもらう。"
    },
    48: {
        "title": "Reply To The Sender To Double-Check If The Link Is Safe To Open As They Might Have Sent It Accidentally.",
        "title_jp": "送信者に返信して、リンクが誤って送信された可能性があるか、リンクを開いても安全か確認する。"
    },
    49: {
        "title": "Change The Login Password To Your Computer.",
        "title_jp": "コンピュータへのログイン パスワードを変更する。"
    },
    50: {
        "title": "Give Them Your Login Credentials Temporarily So Your Colleague Can Meet Their Deadline.",
        "title_jp": "同僚が締め切りに間に合うように、ログイン資格情報を一時的に提供する。"
    },
    51: {
        "title": "The App Might Steal The Data From His Smartphone, Which Could Lead To The Compromise Of Sensitive Data Or Other Applications On The Device Or In The Cloud.",
        "title_jp": "このアプリはスマートフォンからデータを盗む可能性があり、その結果、機密データや、デバイスまたはクラウド内の他のアプリケーションが侵害される可能性がある。"
    },
    52: {
        "title": "Interact With The Scammer Directly By Confronting Them And Getting Down To The Bottom Of The Situation.",
        "title_jp": "詐欺師と直接対話し、状況の真相を突き止める。"
    },
    53: {
        "title": "If You Receive An Email From Someone You Know, It'S Safe To Assume That The Email Is Legitimate And Not A Phishing Attempt.",
        "title_jp": "-知っている人から電子メールを受信した場合、その電子メールは正当なものであり、フィッシングの試みではないと想定しても問題ありません。"
    },
    54: {
        "title": "All Of The Above.",
        "title_jp": "上記のすべて"
    },
    55: {
        "title": "On A Sticker Underneath Your Laptop'S Battery As It'S Not Visible To Anyone Using The Laptop.",
        "title_jp": "ラップトップを使おうとする人にはわかりにくいように、ラップトップのバッテリーの下にあるステッカー。"
    },
    56: {
        "title": "For Personal Safety And Security.",
        "title_jp": "個人の安全とセキュリティのため。"
    },
    57: {
        "title": "Updating Your Email Application Software To The Latest Version.",
        "title_jp": "メールアプリケーションのソフトウェアを最新バージョンに更新する。"
    },
    58: {
        "title": "Use The Usb Port In Front Of Your Computer Instead Of The Back Which Enables You To Disconnect The Memory Stick Quickly If It'S Infected.",
        "title_jp": "コンピュータの背面ではなく、前面にある USB ポートを使用して、もしメモリスティックが感染していた場合にすばやく取り外せるようにする。"
    },
    59: {
        "title": "Password Has To Be Stored In Our Human Mind.",
        "title_jp": "パスワードは人間の記憶に保存する必要がある"
    },
    60: {
        "title": "Highly-Organised Crime Gangs Run Like Businesses Who Deploy Highly Automated And Sometimes Highly Targeted Attacks Against Individuals And Businesses For Profit.",
        "title_jp": "高度に組織化された犯罪集団が営利目的で、高度に自動化された攻撃を、時には高度に標的を絞った個人や企業に対してビジネスのように運営している。"
    },
    61: {
        "title": "Pa5$W0Rd.",
        "title_jp": "Pa5$W0Rd"
    },
    62: {
        "title": "Most People Will Never Receive A Phishing Email.",
        "title_jp": "ほとんどの人はフィッシングメールを受け取ることはありません"
    },
    63: {
        "title": "On A Sticky Note Attached To The Base Of Your Laptop.",
        "title_jp": "ラップトップの底面に貼られた付箋。"
    },
    64: {
        "title": "In Accordance With Your Organisation's Backup Policy And The Criticality Of The Data In Question.",
        "title_jp": "組織のバックアップ ポリシーと問題のデータの重要性に従う。"
    },
    65: {
        "title": "Keep An Eye On The Performance Of Your Computer.",
        "title_jp": "コンピュータの挙動に注意する必要がある"
    },
    66: {
        "title": "90% Of Security Breaches In Companies Are A Result Of Phishing Attacks.",
        "title_jp": "企業のセキュリティ侵害の 90% はフィッシング攻撃によるものです"
    },
    67: {
        "title": "Suggest To Your Colleague That They Call Your It Helpdesk For A Password Reset Link.",
        "title_jp": "同僚に、IT ヘルプデスクに電話してパスワードのリセット リンクを入手するよう提案する。"
    },
    68: {
        "title": "You Should Have One Strong Password That You Use For All Personal And Professional Accounts And Devices.",
        "title_jp": "-個人用および業務用のすべてのアカウントとデバイスに使用する 1 つの強力なパスワードを用意する必要があります"
    },
    69: {
        "title": "To Prevent Being Duped And Falling For Scams.",
        "title_jp": "-だまされて詐欺に遭わないために。"
    },
    70: {
        "title": "True.",
        "title_jp": "-正しい"
    },
    71: {
        "title": "You Should Regularly Change Your Password.",
        "title_jp": "パスワードは定期的に変更する必要があります"
    },
    72: {
        "title": "Perform A Virus Scan Of The Memory Stick Before Opening Any Of Its Files.",
        "title_jp": "ファイルを開く前に、メモリ スティックのウイルス スキャンを実行する。"
    },
    73: {
        "title": 'Click The Option "Check For Phishing" In Microsoft Outlook And Check The Response.',
        "title_jp": "Microsoft Outlook で [check for Phishing] のオプションボタンをクリックし、応答を確認する。"
    },
    74: {
        "title": "Do Not Click The Link. Phone The Sender For Verification.",
        "title_jp": "リンクはクリックしない。 差出人に確認のため電話する。"
    },
    75: {
        "title": "Bored And Lonely Anti-Social Teenagers Who Hack As A Challenge And Sometimes For Profit.",
        "title_jp": "退屈で孤独で反社会的なティーンエイジャーが挑戦として、時には利益のためにハッキングする。"
    },
}


const QUIZ_QUESTIONS = [
    {
        "title": "Which Of The Following Statements About Phishing Is True?.",
        "title_jp": "-フィッシングに関する次の記述のうち、正しいものはどれですか?",
        "group_id": 2,
        "single_option_valid_option_id": 66,
        "options": [
            66,
            20,
            53,
            62
        ],
    },
    {
        "title": "Kato Is Planning A Holiday To Spain. Using His Smartphone, He Finds A Nice Hotel, But All The Information Is Only In Spanish. He Downloads A Free Translation App To Help Him Translate The Information Into English. What Is The Biggest Risk Here?.",
        "title_jp": "加藤さんはスペインへの休暇を計画しています。 彼はスマートフォンを使って素敵なホテルを見つけましたが、情報はすべてスペイン語のみでした。 彼は、情報を英語に翻訳するのに役立つ無料の翻訳アプリをダウンロードします。 ここでの最大のリスクは何ですか？",
        "group_id": 2,
        "single_option_valid_option_id": 51,
        "options": [
            51,
            7,
            23,
            24
        ],
    },
    {
        "title": "You Recently Created An Account For New Smart Watch You Bought. The Smartwatch Has A Feature Where It Can Store Your Credit Card So That You Can Pay For Things Through Your Watch. You’Re Very Interested In This Feature But Want To Make Sure That Your Wallet Is Secure And Cannot Be Accessed By Anyone Other Than Yourself. What Is The Step You Can Take To Ensure Safe Transaction?.",
        "title_jp": "-最近、購入した新しいスマート ウォッチの用にアカウントを作成しました。その スマートウォッチには、クレジットカードを保存できる機能があり、時計を介して支払いを行うことができます。 あなたはこの機能に非常に興味を持っていますが、あなたのウォレットが安全で、あなた以外の誰もアクセスできないようにしたいと考えています。 安全な取引を確保するために実行できる手順方法は何ですか?",
        "group_id": 1,
        "single_option_valid_option_id": 26,
        "options": [
            9,
            14,
            26,
            32
        ],
    },
    {
        "title": "What Is Phishing?.",
        "title_jp": "フィッシングとは？",
        "group_id": 2,
        "single_option_valid_option_id": 10,
        "options": [
            30,
            37,
            10,
            34
        ],
    },
    {
        "title": "How Often Should You Backup Your Data?.",
        "title_jp": "どのくらいの頻度でデータをバックアップする必要がありますか?",
        "group_id": 1,
        "single_option_valid_option_id": 64,
        "options": [
            4,
            5,
            64,
            43
        ],
    },
    {
        "title": "A Colleague Calls You Telling You They Have An Urgent Deadline To Meet. But Unfortunately, They Have Forgotten Their Password To The Client Database. What Should You Do To Help?.",
        "title_jp": "同僚から、締め切りが迫っていることを伝える電話がかかってきました。 残念ながら、彼らはクライアント データベースへのパスワードを忘れてしまいました。 助けるためにあなたは何をすべきですか？",
        "group_id": 1,
        "single_option_valid_option_id": 67,
        "options": [
            11,
            67,
            50,
            19
        ],
    },
    {
        "title": "True Or False: Using A Public Internet Connection, Such As One That You Would Find In Tokyo Metro Station Or Coffee Shop, Is Just As Safe As Using Your Secure Office Network?.",
        "title_jp": "正しいか間違いかで回答してください: 東京メトロの駅やコーヒー ショップで見られるような公共のインターネット接続を使用することは、セキュリティで保護されたオフィス ネットワークを使用するのと同じくらい安全ですか?",
        "group_id": 1,
        "single_option_valid_option_id": 35,
        "options": [
            70,
            35
        ],
    },
    {
        "title": "What Should Employees Do If They Suspect A Phishing Attempt?.",
        "title_jp": "-フィッシングの疑いがある場合、従業員は何をすべきですか?",
        "group_id": 2,
        "single_option_valid_option_id": 73,
        "options": [
            52,
            47,
            73,
            21
        ],
    },
    {
        "title": "Which Of The Following Are The Methods To Improve Your Cybersecurity Practices?.",
        "title_jp": "-サイバーセキュリティ対策を改善する方法は次のうちどれですか?",
        "group_id": 1,
        "single_option_valid_option_id": 54,
        "options": [
            26,
            8,
            13,
            54
        ],
    },
    {
        "title": "You’Ve Inadvertently Opened A Web Link Contained In A Suspicious Email And Now Your Computer Is Behaving Strangely. What Should Course Of Action Should You Follow Next?.",
        "title_jp": "不審な電子メールに含まれる Web リンクをうっかり開いてしまったために、コンピューターコンピュータの動作がおかしくなっています。 次に取るべき行動方針は何ですか？",
        "group_id": 2,
        "single_option_valid_option_id": 1,
        "options": [
            27,
            18,
            1,
            65
        ],
    },
    {
        "title": "A Supplier Has Sent You A Usb Memory Stick In The Post Which Contains Drawings Of A Project That You’Re Collaborating On. What Is The Safest Course Of Action?.",
        "title_jp": "サプライヤが、あなたと共同作業しているプロジェクトの図面を含む USB メモリをあなた宛てに郵便で送ってきました。 最も安全な行動は何ですか？",
        "group_id": 2,
        "single_option_valid_option_id": 2,
        "options": [
            72,
            58,
            2,
            3
        ],
    },
    {
        "title": "Where Should You Store The Password For Your Laptop?.",
        "title_jp": "ラップトップPCのパスワードはどこに保存すべきですか?",
        "group_id": 1,
        "single_option_valid_option_id": 59,
        "options": [
            55,
            63,
            31,
            59,
        ],
    },
    {
        "title": "You Get A Call From Your Technical Support Helpdesk Saying They Are Performing An Urgent Server Upgrade. They Ask You For Your Password. What Should You Do?.",
        "title_jp": "テクニカル サポートのヘルプデスクから、緊急のサーバー アップグレードを実行しているとの電話がありました。 彼らはあなたのパスワードを尋ねてきます。 あなたは何をするべきでしょうか？",
        "group_id": 1,
        "single_option_valid_option_id": 38,
        "options": [
            38,
            15,
            45,
            39
        ],
    },
    {
        "title": "Your Personal Email Account Has Been Compromised. What Is The Best Way Of Preventing Further Unauthorised Access To Your Email Account?.",
        "title_jp": "個人用のメール アカウントが侵害されました。 メール アカウントへのさらなる不正アクセスを防止する最善の方法は何ですか?",
        "group_id": 2,
        "single_option_valid_option_id": 16,
        "options": [
            16,
            17,
            49,
            57
        ],
    },
    {
        "title": "Why Do I Need To Watch Out For Phishing Emails?.",
        "title_jp": "-フィッシング メールに注意する必要があるのはなぜですか?",
        "group_id": 2,
        "single_option_valid_option_id": 54,
        "options": [
            56,
            25,
            69,
            54
        ],
    },
    {
        "title": "Which Of The Following Is Not True Regarding Passwords?.",
        "title_jp": " -パスワードに関して正しくないのは次のうちどれですか?",
        "group_id": 1,
        "single_option_valid_option_id": 68,
        "options": [
            68,
            42,
            40,
            71
        ],
    },
    {
        "title": "Email Authentication Can Help Protect Against Phishing Attacks. True Or False?.",
        "title_jp": "電子メール認証は、フィッシング攻撃から保護するのに役立ちます。 正しいでしょうか、それとも間違いでしょうか？",
        "group_id": 2,
        "single_option_valid_option_id": 70,
        "options": [
            70,
            35
        ],
    },
    {
        "title": "Which Of The Following Would Be The Strongest Password?.",
        "title_jp": "次のうち、最も強力なパスワードはどれですか?",
        "group_id": 1,
        "single_option_valid_option_id": 22,
        "options": [
            29,
            61,
            33,
            22
        ],
    },
    {
        "title": "If You Fall For A Phishing Scam, What Should You Do To Limit The Damage?.",
        "title_jp": "フィッシング詐欺に引っかかった場合、被害を最小限に抑えるために何をすべきですか?",
        "group_id": 2,
        "single_option_valid_option_id": 41,
        "options": [
            44,
            6,
            41
        ],
    },
    {
        "title": "Which Of The Following Statements Best Describes The Modern-Day Hacker?.",
        "title_jp": "-次の記述のうち、現代のハッカーを最もよく表しているのはどれですか?",
        "group_id": 1,
        "single_option_valid_option_id": 54,
        "options": [
            75,
            12,
            60,
            54
        ],
    },
    {
        "title": "Unexpectedly, You Get An Email From A Supplier Who Requests You To Urgently Click On An Email Link Which They’Ve Sent You. What Is The Safest Option?.",
        "title_jp": "サプライヤから電子メールが届き、リンクを大至急クリックするように要求されました。 最も安全な選択肢は何ですか?",
        "group_id": 2,
        "single_option_valid_option_id": 74,
        "options": [
            28,
            36,
            48,
            74
        ],
    },
]


/**
 * Main seed function to populate the database after droping the tables.
 * @returns {Promise<void>}
 */
const seed = async (reset = false) => {

    if (reset === true) {
        try {
            await dbClient.dropAllSchemas({})
        } catch (e) {
        }

        try {
            await dbClient.sync()
        } catch (e) {
        }
    }

// Quiz
    await Quiz.bulkCreate(QUIZZES.map(_ => ({..._, ...COMMON_DATA})))

// QuizGroup
    await QuizGroup.bulkCreate(QUIZ_GROUPS.map(_ => ({..._, ...COMMON_DATA})))

// QuizOption
    await QuizOption.bulkCreate(Object.keys(QUIZ_OPTIONS).map(_ => {
        const config = QUIZ_OPTIONS[_]

        return {
            ...config,
            ...COMMON_DATA,
            sub_title: config.title,
            sub_title_jp: config.title_jp
        }
    }))

// QuizQuestion
    await Promise.all(QUIZ_QUESTIONS.map(async _ => {
        const options = _.options
        _.options = undefined

        const question = await QuizQuestion.create({
            ..._,
            ...COMMON_DATA,
            sub_title: _.title,
            sub_title_jp: _.title_jp,
            type: "single_option",
            score: 1,
        })

        await Promise.all(options.map(async optionId => {
            await QuestionM2MOption.create({
                ...COMMON_DATA,
                question_id: question.id,
                option_id: optionId
            })
        }))

    }))

    // User
    // await User.create({
    //     username: "admin",
    //     password: "password",
    // })
    await Reports.create({
        id:1,
        Username:"chandran",
        title:"chan",
        status:"open"
    })

}

seed().then(_ => {
    console.log("Database Seeded!")
    process.exit()
})
