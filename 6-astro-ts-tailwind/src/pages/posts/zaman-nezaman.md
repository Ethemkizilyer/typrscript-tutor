---
layout: "../../layouts/BlogPost.astro" # layout: "..." aralarındaki boşluk dahi önemli hata veriyor.
title: Bu Benim Üçüncü Paylaşımım
date: 2022-12-24
---

RTK Sorgusu En İyi Uygulamaları TLDR; Bu gönderide, yeni uygulamalarımızda RTK Sorgusunu kullanmaya başladığımızdan beri grubumdaki diğer geliştiricilerin gündeme getirdiği ana soruları ve endişeleri ele alacağım. Haziran 2021'de Redux Toolkit, RTK Sorgusu adı verilen güçlü bir veri alma ve önbelleğe alma aracını kullanıma sundu. React-Query gibi popüler alternatiflerle karşılaştırıldığında, RTK Query'nin ana gücü, redux mağazasıyla varsayılan entegrasyonudur. Diğer indirgeyiciler, parçalar ve hatta Redux DevTools tarafından yakalanabilecek eylemler üretir ki bu çok uygundur. RTK Sorgusu - RTK Sorgulamanın sorumluluğu nedir? 🤔 RTK Sorgusu şunlardan sorumludur: İstemci tarafında veri alma ve önbelleğe alınmış verileri tutma. Verileri değiştirme (oluşturma/güncelleme/silme) ve sunucudaki değişiklikleri önbellekle eşitleme. İsteklerin yaşam döngüsünü takip etmek (örn. isLoading, isError). Aynı veriler için yinelenen isteklerden kaçınırken önbelleğe alınmış verileri sunar. Gerektiğinde verileri yeniden getirme (ve önbellekle eşitleme). - HER istek için RTK Sorgusu kullanmalı mıyız? 🤔 İdeal olarak, evet. Uygulamanın ihtiyaç duyduğu açıktaki API uç noktalarını sorgulamak/değiştirmek için API nesnesini (RTK Sorgusu createApi'yi dışa aktarır) kullanmalıyız. RTKQ'nun en iyi şekilde çalışması için uygulama başına bir API dilimi olmalıdır. Daha fazla bilgi için şuna bakın: Bir API dilimini tanımlama. Bundan tam olarak yararlanmak için, tüm istekler için RTKQ kullanabiliriz ve kullanmalıyız. Doğrudan UI bileşenlerine hizmet etmeyen istekler için bile (React kancaları aracılığıyla). Daha fazla bilgi için şuna bakın: React Hooks Olmadan Kullanım. - Hala eski güzel redux mağazasını kullanmalı mıyız? 🤔 createApi'nin, RTK'nın createSlice (kendi içinde createReducer+createAction'ı soyutlayan) üzerindeki bir soyutlama düzeyi olduğunu bilmek önemlidir. Halihazırda başka indirgeyicilere sahip olabilecek bir redux deposuna eklemek için başka bir indirgeyici oluşturur. RTKQ'dan (createApi olmayan indirgeyiciler) tamamen yararlanan uygulamalarda hâlâ düzenli indirgeyiciler olabilir. Sunucu verileri olmayan herhangi bir genel durumu işleyebilirler. Örneğin, filtre durumu, arama terimi, geçiş durumu, sayfalandırma durumu vb. İstemcide önbelleğe alınan herhangi bir sunucu verisi için, yalnızca RTKQ'nun API dilim azaltıcısını kullanmalı ve sunucu verilerini başka bir yerde tutmaktan kaçınmalıyız (aksi takdirde, güncellemeler/mutasyonlar durumunda durumunu manuel olarak senkronize etmemiz gerekir). Normal indirgeyicilerle birlikte RTKQ API düşürücüye sahip bir redux mağazası - Birden fazla API çağrısının karmaşık mantığına ne dersiniz? 🤔 Çoğu durumda, bir isteğin ardından diğerini veya birden çok isteği paralel olarak yürütmemiz gerekir. Her iki durumda da, ilk isteğin uç noktası için isteğe bağlı bir parametre olan RTKQ'nun onQueryStarted parametresini kullanmalıyız. Bize isteğin orijinal söz nesnesine ( queryFulfilled) erişim sağlar ve onu bekleyebilir veya diğer vaatlerle birlikte Promise.all'ı kullanabiliriz. Sunucuya birden fazla çağrı gönderen karmaşık bir istek - Hâlâ zaman uyumsuz işlemlere ihtiyacımız var mı (ör. thunk'lar)? 🤔 RTKQ ile ilgili deneyimime göre, onQueryStarted çok kullanışlıdır ve uygulamadaki redux zaman uyumsuz ara katman yazılımının çoğunun yerini alabilir. (ör. redux-thunk, redux-saga, redux-mantık). Bununla birlikte, mantığımızın tek bir uç noktaya bağlı olmasını ve daha genel olmasını istemiyorsak (örneğin, bazı isteklerle bir sayfayı önyüklemek) yine de zaman uyumsuz bir eyleme ihtiyacımız olabilir. Gerekli görünüyorsa, onQueryStarted mantıklarıyla birlikte zaman uyumsuz eylemleri kullanmakta sorun yoktur (RTK'nın createAsyncThunk'a bakın). - Veriler nasıl yeniden getirilir / önbellek nasıl düzgün şekilde geçersiz kılınır? 🤔 RTKQ ile verileri yenilemenin ana yöntemi Önbellek Etiketleri kullanmaktır. Hem sorgu uç noktalarına hem de mutasyon uç noktalarına (ör. GET /users ve POST /users) sahip kaynaklarla uğraşırken en çok yardımcı olur. Sorgu uç noktasına bir etiket sağlayabiliriz (basit bir dize etiketi veya daha karmaşık bir nesne etiketi) ve bu sorgu uç noktasındaki tüm kaynaklar etiketi alır. Bu etiketi geçersiz kılmak için tanımlanan bir mutasyon uç noktasını çağırdığımızda, bu etikete sahip tüm sorgu uç noktaları otomatik olarak önbelleği (depo) yeniden getirecek ve güncelleyecektir. Önbellek etiketlerine ek olarak, önbelleği geçersiz kılmak için daha fazla yöntem vardır (farklı kullanım durumları için). Kısacası: refetch : Sorgu kancaları tarafından döndürülen bir işlev. Bir yeniden getirmeyi tetikler (genellikle useEffect içinde çağrılır). inisiye : Bitiş noktası nesnesindeki bir işlev. Yeniden getirmeyi tetikler. keepUnusedDataFor : Abone olmadan (onu kullanan işlenmiş bileşenler olmadan) verilerin tutulacağı süre (saniye). Varsayılan değer 60'tır. refetchOnMountOrArgChange : Yeni bileşenler abone olduğunda veya farklı bağımsız değişkenlerle bir kanca çağrıldığında daha sık yeniden getirir. refetchOnFocus : Pencere odağında veya sekme anahtarında yeniden getir. refetchOnReconnect : İnternet bağlantısı yeniden kurulursa yeniden getirir. updateQueryData : Etiketlerle otomatik güncellemelerin yeterli olmadığı durumlarda (ör. yanıt gelmeden önce güncelleme) bir uç nokta için önbellek değerini manuel olarak güncellemenin daha gelişmiş bir yolu. Bunlar hakkında daha fazla bilgi burada bulunabilir. - Hatalar nasıl düzgün bir şekilde ele alınır? 🤔 Hata nesnesini alma şeklimiz, varsayılan fetchBaseQuery'yi (hata adlı bir özelliği döndürür) veya özel bir getirme sorgusu (hatanın nasıl döndürüleceğine karar verebileceğimiz) kullanıp kullanmadığımıza bağlıdır. Belirli bir uç noktadaki bir hata için özel bir işleme ihtiyaç duymamız durumunda, bunu queryFulfilled taahhüdünde hatayı yakalayarak onQueryStarted ile yapabiliriz: onQueryStarted içindeki söz hatasını yakalamak - RTKQ'nun önbelleğe alınmış verilerini kullanan seçiciler nasıl oluşturulur? 🤔 Her uç nokta, depodan önbelleğe alınmış verileri için bir seçici döndüren bir seçme işlevi sağlar (bu seçici, sorgu kancaları olarak adlandıracağımız bağımsız değişken olarak bir önbellek anahtarı alabilir). Bunun gibi basit bir seçici oluşturabiliriz: önbelleğe alınmış verilere hizmet veren bir seçici oluşturma Örnekle ilgili not: aynı uç nokta için birden çok seçiciye ihtiyaç duyabileceğimiz durumlarda, api.endpoints.getUsers.select() öğesini ayrı ayrı çağırmak ve onu kullanan birden çok seçici oluşturmak en iyisi olacaktır. Bu, birleşik seçiciler veya verileri hesaplayan seçiciler oluşturmak için de yararlı olabilir (örn. yeniden yansıtma ile). - "Aptal" bileşenlerde kanca spam'ı nasıl önlenir? 🤔 RTKQ'nun bileşenlerin jenerik/aptal/sunumsal olmasını engellemeye yardımcı olmadığı doğrudur. Tonlarca React kancası sağlayarak bizi daha fazla bileşeni doğrudan mağazaya bağlamaya itiyor. Ancak bu sorunun RTKQ'nun kendisiyle hiçbir ilgisi yoktur. Bence mağazaya daha fazla bileşen bağlamak kötü bir uygulama değil ve aynı zamanda performansı da artırıyor. Bu, günümüzde kancalar çağında birçok React+Redux uygulamasının ilerlediği yöndür ve RTKQ bu yaklaşımı benimser. Bu konu hakkında daha fazla bilgiyi buradan okuyabilirsiniz. Kendimizi tek bir bileşende (birden çok türde veri/mutasyon kullanan) çok sayıda kanca kullanırken ne kadar çabuk bulduğumuzla ilgileniyorsanız, tüm kanca çağrılarını kolayca ayrı bir özel kancaya çıkarabilirsiniz.